package com.generics.auth.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "api/{appName}/users")
public class AppUserController {

    private String appName;

    @PostMapping("/signin")
    public String login() {
        return "Trying to signin";
    }

}
