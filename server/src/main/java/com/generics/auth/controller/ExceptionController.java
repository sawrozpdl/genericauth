package com.generics.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.generics.auth.exception.HttpException;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import javax.servlet.http.HttpServletResponse;


@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler(HttpException.class)
    public void handleCustomException(HttpServletResponse response, HttpException ex) throws IOException{
        response.sendError(ex.getHttpStatus().value(), ex.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public void handleAccessDeniedException(HttpServletResponse res) throws IOException {
        res.sendError(HttpStatus.FORBIDDEN.value(), "Access denied");
    }

    @ExceptionHandler(Exception.class)
    public void handleException(HttpServletResponse res) throws IOException {
        res.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error");
    }

}
