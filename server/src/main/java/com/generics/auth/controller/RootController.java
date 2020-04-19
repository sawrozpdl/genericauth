package com.generics.auth.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @Value("${env.spring-env}")
    String env;

    @GetMapping("/api")
    public String index() {
        return "Hello from API! ENV: " + env;
    }

}