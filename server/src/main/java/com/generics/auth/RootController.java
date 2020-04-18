package com.generics.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class RootController {

    @Value("${env.spring-env}")
    String test;

    @RequestMapping("/")
    public String index() {
        return "What is up  !" + test;
    }

}