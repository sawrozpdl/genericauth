package com.generics.auth.service;

import com.generics.auth.exception.HttpException;
import com.generics.auth.utils.Http;
import com.generics.auth.utils.Str;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class VerifyService {

    @Autowired
    MailService mailService;

    @Autowired
    TokenService tokenService;

    @Autowired
    ResourceLoader resourceLoader;

    public Object verifyEmail(String email, String redirect, HttpServletRequest request) {
        String token = tokenService.createFor(email);
        String[] reqInfo = Http.getInfo(request);
        try {
            String redirectUrl = String.format("%s?token=%s", redirect, token);
            Resource resource = resourceLoader.getResource("classpath:templates/verify.html");
            String body = Str.asString(resource);

            String[] args = {"action_name::Verify Email",
                    "action_url::" + redirectUrl,
                    "browser_name::" + reqInfo[1],
                    "operating_system::" + reqInfo[0]};

            body = Str.format(body, args);

            mailService.send(email, "Email Verification", body);
            return new Object() {
                public final String message = "Mail Sent!";
                public final boolean ok = true;
            };
        }
        catch (Exception e) {
            e.printStackTrace();
            throw new HttpException("Message sending failed!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
