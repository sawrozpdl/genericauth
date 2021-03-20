package com.generics.auth.service;

import com.generics.auth.exception.HttpException;
import com.generics.auth.model.App;
import com.generics.auth.model.Credential;
import com.generics.auth.model.User;
import com.generics.auth.model.UserRole;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TokenService {

    @Value("${server.secret}")
    private String secret;

    @Autowired
    private UserService userService;

    @Autowired
    private AppService appService;

    public Claims getClaims(String token, String secret) {
        try {
            JwtParser parser = Jwts.parser();
            if (secret == null) {
                int i = token.lastIndexOf('.');
                token = token.substring(0, i+1);
                return parser.parseClaimsJwt(token).getBody();
            }
            else {
                parser.setSigningKey(secret);
                return parser.parseClaimsJws(token).getBody();
            }
        } catch (JwtException je) {
            throw new HttpException("Invalid or Bad token", HttpStatus.UNAUTHORIZED);
        }
    }

    public String getSecretForApp(String appName) {
        App app = appService.getAppByName(appName);
        Credential credential = app.getCredential();
        return credential.getClientSecret();
    }

    @SuppressWarnings("unchecked")
    public User parseToken(String token) {
        Claims _claims = getClaims(token, null);
        String fromApp = (String) _claims.get("appName");

        String signingSecret = secret;
        if (fromApp != null)
            signingSecret = getSecretForApp(fromApp);

        Claims claims = getClaims(token, signingSecret);
        if (new Date().compareTo(claims.getExpiration()) >= 0)
            throw new HttpException("Token has expired", HttpStatus.UNAUTHORIZED);
        String email = claims.getSubject();
        Optional<User> user = userService.getUserByEmail(email);
        user.ifPresent(value -> {
            String appName = (String) claims.get("appName");
            ArrayList<String> roles = (ArrayList<String>) claims.get("roles");
            value.setActiveApp(appName);
            value.setActiveRoles(roles);
        });
        return user.orElseGet(() -> new User(null, email, null));
    }

    public String createFor(String email) {
        try {
        Claims claims = Jwts.claims().setSubject(email);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(getExpiryDate(true))
                .signWith(SignatureAlgorithm.HS256, secret).compact();
        }
        catch (Exception e) {
            throw new HttpException("Failed to generate token", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Date getExpiryDate(boolean isAccessToken) {
        int ACCESS_TOKEN_EXPIRATION = 600000;
        int REFRESH_TOKEN_EXPIRATION = 864000000;
        return new Date(System.currentTimeMillis() + (isAccessToken ? ACCESS_TOKEN_EXPIRATION : REFRESH_TOKEN_EXPIRATION));
    }

    public String generateToken(User user,String appName, boolean isAccessToken) {
        try {
            Claims claims = Jwts.claims().setSubject(user.getEmail());
            claims.put("userId", user.getId() + "");
            claims.put("appName", appName);
            Set<UserRole> userRoles = user.getRoles();
            ArrayList<String> roles = new ArrayList<>();
            userRoles.forEach(userRole -> {
                if (userRole.getApp().getName().equals(appName))
                    roles.add(userRole.getRole().getName());
            });
            claims.put("roles", roles);

            String signingSecret = getSecretForApp(appName);

            return Jwts.builder()
                    .setClaims(claims)
                    .setIssuedAt(new Date())
                    .setExpiration(getExpiryDate(isAccessToken))
                    .signWith(SignatureAlgorithm.HS256, signingSecret).compact();
        }
        catch (Exception e) {
            throw new HttpException("Failed to generate token", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
