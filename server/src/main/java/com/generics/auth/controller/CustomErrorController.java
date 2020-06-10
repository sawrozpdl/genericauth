package com.generics.auth.controller;

import com.generics.auth.exception.ErrorJson;
import org.springframework.web.context.request.WebRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class CustomErrorController implements ErrorController {

    private static final String PATH = "/error";

    @Value("${spring.env}")
    private String  env;

    @Autowired
    private ErrorAttributes errorAttributes;

    /**
     * Custom error controller
     *
     * @param request raw request
     * @param response response to get status from
     * @return ErrorJson
     */
    @RequestMapping(value = PATH)
    ErrorJson error(WebRequest request, HttpServletResponse response) {
        boolean debug = env.equals("development");
        return new ErrorJson(response.getStatus(), errorAttributes.getErrorAttributes(request, debug));
    }

    /**
     * Get path of error endpoint
     *
     * @return path of error endpoint
     */
    @Override
    public String getErrorPath() {
        return PATH;
    }

}