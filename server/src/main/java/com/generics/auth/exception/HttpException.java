package com.generics.auth.exception;

import org.springframework.http.HttpStatus;

public class HttpException extends RuntimeException {

    private final String message;
    private final HttpStatus httpStatus;

    public HttpException(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

}