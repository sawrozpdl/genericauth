package com.generics.auth.service;

import com.generics.auth.exception.HttpException;
import com.generics.auth.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class TokenService {

    @Value("${server.secret}")
    private String secret;

    @Autowired
    private UserService userService;

    private final Integer ACCESS_TOKEN_EXPIRATION = 600000;
    private final Integer REFRESH_TOKEN_EXPIRATION = 864000000;

    public Claims getClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

        } catch (JwtException je) {
            throw new HttpException("Invalid or Bad token", HttpStatus.UNAUTHORIZED);
        }
    }

    public User parseToken(String token) {
        Claims claims = getClaims(token);
        if (new Date().compareTo(claims.getExpiration()) >= 0)
            throw new HttpException("Token has expired", HttpStatus.UNAUTHORIZED);
        String email = claims.getSubject();
        Optional<User> user = userService.getUserByEmail(email);
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
       return new Date(System.currentTimeMillis() + (isAccessToken ? ACCESS_TOKEN_EXPIRATION : REFRESH_TOKEN_EXPIRATION));
    }

    public String generateToken(User user,String appName, boolean isAccessToken) {
        try {
            Claims claims = Jwts.claims().setSubject(user.getEmail());
            claims.put("userId", user.getId() + "");
            claims.put("appName", appName);
            claims.put("roles", user.getRoles());

            return Jwts.builder()
                    .setClaims(claims)
                    .setIssuedAt(new Date())
                    .setExpiration(getExpiryDate(isAccessToken))
                    .signWith(SignatureAlgorithm.HS256, secret).compact();
        }
        catch (Exception e) {
            throw new HttpException("Failed to generate token", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
