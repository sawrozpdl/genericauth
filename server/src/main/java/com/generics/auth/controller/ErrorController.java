package com.generics.auth.controller;

import com.generics.auth.exception.ErrorJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletResponse;

@RestController
class CustomErrorController implements ErrorController {

    private static final String PATH = "/error";

    @Value("${spring.env}")
    private String  env;

    @Autowired
    private ErrorAttributes errorAttributes;

    @RequestMapping(value = PATH)
    ErrorJson error(WebRequest request, HttpServletResponse response) {
        boolean debug = env.equals("development");
        return new ErrorJson(response.getStatus(), errorAttributes.getErrorAttributes(request, debug));
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }

}