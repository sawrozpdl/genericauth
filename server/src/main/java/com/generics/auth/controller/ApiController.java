package com.generics.auth.controller;

import com.generics.auth.model.Mail;
import com.generics.auth.model.User;
import com.generics.auth.object.PasswordBody;
import com.generics.auth.security.AuthenticationService;
import com.generics.auth.service.MailService;
import com.generics.auth.service.UserService;
import com.generics.auth.service.VerifyService;
import com.generics.auth.utils.Gen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.atomic.AtomicBoolean;


@RestController
public class ApiController {

    @Autowired
    VerifyService verifyService;

    @Autowired
    MailService mailService = new MailService();

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationService authenticationService;

    /**
     * Send a 'actionName' verification token to the given email
     *
     * @param mail Email object
     * @return Json response regarding the result
     */
    @PostMapping("/api/send-mail")
    public Object send(@RequestBody Mail mail) {
        AtomicBoolean success = new AtomicBoolean(true);
        try {
            for (String email : mail.getToEmails()) {
                mailService.send(email, mail.getSubject(), mail.getMessage(), mail.getFrom());
            }
        } catch (Exception e) {
            e.printStackTrace();

            success.set(false);
        }
        return new Object() {
            public final String message = success.get() ? "Mail Sent" : "Error";
        };
    }

    /**
     * Send a 'actionName' verification token to the given email
     *
     * @param id base64 encoded email for verification
     * @param redirectTo url to send the token as redirectTo?token=RESULTING_TOKEN
     * @param actionName name of the action user invokes to perform
     * @param actionDescription description of the action to be included in email template
     * @return Json response regarding the result
     */
    @PostMapping("/api/verify")
    public Object verify(@RequestParam String id,
                         @RequestParam String redirectTo,
                         @RequestParam String actionName,
                         @RequestParam String actionDescription) {
        String email = Gen.base64Decode(id);
        return verifyService.verifyEmail(email, redirectTo, actionName, actionDescription);
    }

    /**
     * Authorizes a user with the given token
     *
     * @param request authenticated request
     * @return User if the token is valid one
     */
    @PostMapping("/api/authenticate")
    public Object authenticate(HttpServletRequest request) {
        return authenticationService.authenticateRequest(request);
    }

    /**
     * Change the password of user if valid token provided in the request
     *
     * @param passwordBody request body with new password
     * @param request authenticated request
     * @return JSON success message if success
     */
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
