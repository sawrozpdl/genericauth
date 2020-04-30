package com.generics.auth.controller;

import com.generics.auth.service.VerifyService;
import com.generics.auth.utils.Gen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


@RestController
public class ApiController {

    @Autowired
    VerifyService verifyService;

    @PostMapping("/api/verify")
    public Object verify(@RequestParam String id, @RequestParam String redirectTo, HttpServletRequest request) {
        String email = Gen.base64Decode(id);
        return verifyService.verifyEmail(email, redirectTo, request);
    }

}
