package com.generics.auth.controller;

import com.generics.auth.model.User;
import com.generics.auth.object.PasswordBody;
import com.generics.auth.security.AuthenticationService;
import com.generics.auth.service.UserService;
import com.generics.auth.service.VerifyService;
import com.generics.auth.utils.Gen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


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
                         @RequestParam String actionDescription) {
        String email = Gen.base64Decode(id);
        return verifyService.verifyEmail(email, redirectTo, actionName, actionDescription);
    }

    @PostMapping("/api/authenticate")
    public Object authorize(HttpServletRequest request) {
        return authenticationService.authenticateRequest(request);
    }

    @PostMapping("/api/change-password")
    public Object changePassword(@RequestBody PasswordBody passwordBody, HttpServletRequest request) {
        User user = authenticationService.authorizeRequest(request, null, null, null);
        String password = passwordBody.getPassword();
        userService.changePassword(user, password);
        return new Object() {
            public final Boolean ok = true;
        };
    }

}
