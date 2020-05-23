package com.generics.auth.security;

import com.generics.auth.constant.Roles;
import com.generics.auth.exception.HttpException;
import com.generics.auth.model.User;
import com.generics.auth.service.AppService;
import com.generics.auth.service.TokenService;
import com.generics.auth.service.UserRoleService;
import com.generics.auth.service.UserService;
import com.generics.auth.utils.Gen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.generics.auth.utils.Error;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

@Service
public class AuthenticationService {

    @Autowired
    UserService userService;

    @Autowired
    AppService appService;

    @Autowired
    UserRoleService userRoleService;

    @Autowired
    TokenService tokenService;

    public User authorizeRequest(HttpServletRequest request, String appName, String[] roles, String username) {
        String header = request.getHeader("Authorization");

        String error = "Not authorized";

        if (header == null) error = "No Authorization credentials provided";
        else {
            String[] str = header.split(" ");
            String tokenTag = str[0];
            String token = str[1];

            if (tokenTag == null || !tokenTag.equals("Bearer")) error = "Invalid authorization schema";
            else {
                error = "Invalid token or expired";
                User user = tokenService.parseToken(token);
                if (roles == null) return  user;
                if (user != null) {
                    error = "Access Denied";
                    boolean isAuthorized = username != null && !user.getUsername().equals(username);
                    List<String> userRoles = userRoleService.getUserRolesForApp(user.getUsername(), appName);
                    if ((userRoles.containsAll(Arrays.asList(roles)) && isAuthorized) || userRoles.contains(Roles.ADMIN.name())) {
                        return user;
                    }
                }
            }
        }

        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }

    public Object authenticateRequest(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        String error = "";
        HttpStatus status = HttpStatus.BAD_REQUEST;

        if (header == null) error = "No Authorization credentials provided";
        else {
            String[] str = header.split(" ");
            String tokenTag = str[0];
            String token = str[1];

            status = HttpStatus.UNAUTHORIZED;
            error = "Invalid Authentication method, Supported: Bearer, Basic";

            switch (tokenTag) {
                case "Bearer": {
                    User user = tokenService.parseToken(token);
                    if (user != null)
                        return user;
                    error = "Invalid token or expired";
                    break;
                }
                case "Refresh": {
                    User user = tokenService.parseToken(token);
                    if (user != null) {
                        return new Object() {
                            public final String accessToken = tokenService.generateToken(user,user.getActiveApp(), true);
                        };
                    }
                    error = "Refresh Token invalid or expired";
                    break;
                }
            }
        }
        throw new HttpException(error, status);
    }

    public Object loginRequest(HttpServletRequest request, String appName) {
        if (!appService.appExists(appName))
            throw new HttpException(Error.missing("App", "name", appName), HttpStatus.NOT_FOUND);

        String header = request.getHeader("Authorization");

        String error = "Invalid username or password";
        HttpStatus status = HttpStatus.BAD_REQUEST;

        if (header == null) error = "No Authorization credentials provided";
        else {
            status = HttpStatus.UNAUTHORIZED;
            String[] str = header.split(" ");
            String tokenTag = str[0];
            String token = str[1];

            if (tokenTag.equals("Basic")) {
                String[] credentials = Gen.base64Decode(token).split(":");
                String username = credentials[0];
                String password = Gen.getMD5From(credentials[1]);

                User user = userService.authenticateUser(username, password, appName);
                if (user != null) {
                    return new Object() {
                        public final String accessToken = tokenService.generateToken(user,appName, true);
                        public final String refreshToken = tokenService.generateToken(user,appName, false);
                    };
                }
            }
            else {
                error = "Invalid Authentication method, Supported: Basic for login";
            }

        }

        throw new HttpException(error, status);
    }

    public Object logoutRequest(HttpServletRequest request, HttpServletResponse response, String appName) {
        if (!appService.appExists(appName))
            throw new HttpException(Error.missing("App", "name", appName), HttpStatus.NOT_FOUND);
        response.setStatus(HttpStatus.CREATED.value());
        return new Object() {
            public final String message = "Success";
        };
    }
}
