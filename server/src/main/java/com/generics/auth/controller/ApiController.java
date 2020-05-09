package com.generics.auth.controller;

import com.generics.auth.model.User;
import com.generics.auth.object.PasswordBody;
import com.generics.auth.security.AuthenticationService;
import com.generics.auth.service.UserService;
import com.generics.auth.service.VerifyService;
import com.generics.auth.utils.Gen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


@RestController
public class ApiController {

    @Autowired
    VerifyService verifyService;

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/api/verify")
    public Object verify(@RequestParam String id,
                         @RequestParam String redirectTo,
                         @RequestParam String actionName,
                         HttpServletRequest request) {
        String email = Gen.base64Decode(id);
        return verifyService.verifyEmail(email, redirectTo, actionName, request);
    }

    @PostMapping("/api/forgot-password")
    public Object changePassword(@RequestBody PasswordBody passwordBody, HttpServletRequest request) {
        User user = authenticationService.authorizeRequest(request, null, null);
        String password = passwordBody.getPassword();
        userService.changePassword(user, password);
        return new Object() {
            public final Boolean ok = true;
        };
    }

}
