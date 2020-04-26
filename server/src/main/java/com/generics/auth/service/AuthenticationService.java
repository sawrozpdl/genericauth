package com.generics.auth.service;

import com.generics.auth.exception.HttpException;
import com.generics.auth.model.User;
import com.generics.auth.utils.Gen;
import com.generics.auth.utils.Http;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.generics.auth.utils.Error;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class AuthenticationService {

    @Autowired
    UserService userService;

    @Autowired
    AppService appService;

    @Autowired
    TokenService tokenService;

    public User authenticateRequest(HttpServletRequest request, HttpServletResponse response, String appName) {
        if (!appService.appExists(appName))
            throw new HttpException(Error.missing("App", "name", appName), HttpStatus.NOT_FOUND);

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
                        Cookie accessToken = Http.createCookie("accessToken", tokenService.generateToken(user,appName, true));
                        response.addCookie(accessToken);
                        return user;
                    }
                    error = "Refresh Token invalid or expired";
                    break;
                }
                case "Basic":
                    String[] credentials = Gen.base64Decode(token).split(":");
                    String username = credentials[0];
                    String password = Gen.getMD5From(credentials[1]);
                    User user = userService.authenticateUser(username, password, appName);
                    if (user != null) {
                        Cookie accessToken = Http.createCookie("accessToken", tokenService.generateToken(user, appName,true));
                        Cookie refreshToken = Http.createCookie("refreshToken", tokenService.generateToken(user,appName, false));
                        response.addCookie(accessToken);
                        response.addCookie(refreshToken);
                        return  user;
                    }
                    error = "Invalid username or password";
                    break;
            }
        }
        throw new HttpException(error, status);
    }

    public Object logoutRequest(HttpServletRequest request, HttpServletResponse response, String appName) {
        if (!appService.appExists(appName))
            throw new HttpException(Error.missing("App", "name", appName), HttpStatus.NOT_FOUND);
        Cookie negativeAccessToken = Http.removeCookie("accessToken");
        Cookie negativeRefreshToken = Http.removeCookie("refreshToken");
        response.setStatus(HttpStatus.CREATED.value());
        response.addCookie(negativeAccessToken);
        response.addCookie(negativeRefreshToken);
        return new Object() {
            public final String message = "Success";
        };
    }
}
