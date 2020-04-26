package com.generics.auth.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.generics.auth.exception.ErrorResponse;
import com.generics.auth.exception.HttpException;
import org.springframework.http.HttpStatus;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

public class Http {

    public static <T> void sendErrorResponse(HttpServletResponse response, HttpException object) throws IOException {
        response.setStatus(object.getHttpStatus().value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        ErrorResponse error = new ErrorResponse(object.getHttpStatus(), object.getMessage());
        error.setTimestamp(LocalDateTime.now());
        error.setStatus((HttpStatus.NOT_FOUND.value()));
        response.getWriter().write(new ObjectMapper()
                .writeValueAsString(error));
    }

    public static Cookie createCookie(String key, String content) {
        final Cookie cookie = new Cookie(key, content);
        cookie.setMaxAge(8640000);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }

    public static Cookie removeCookie(String key) {
        final Cookie cookie = new Cookie(key, null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }
}
