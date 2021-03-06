package com.generics.auth.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class RootController {

    @Value("${server.env}")
    String appEnv;

    @Value("${spring.app-name}")
    String appName;

    @Value("${spring.version}")
    String apiVersion;

    /**
     * Redirect to /api
     *
     * @param httpServletResponse response to redirect to /api
     */
    @GetMapping("/")
    public void index(HttpServletResponse httpServletResponse) {
        httpServletResponse.setHeader("Location", "/api");
        httpServletResponse.setStatus(302);
    }

    /**
     * Display API info
     *
     * @return JSON response with API details
     */
    @GetMapping("/api")
    public Object api() {
        return new Object() {
            public final String app = appName;
            public final String version = apiVersion;
            public final String environment = appEnv;
        };
    }

}