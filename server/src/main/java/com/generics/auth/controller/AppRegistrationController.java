package com.generics.auth.controller;

import com.generics.auth.constant.Roles;
import com.generics.auth.model.AppRegistration;
import com.generics.auth.security.AuthenticationService;
import com.generics.auth.service.AppRegistrationService;
import com.generics.auth.object.RequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class AppRegistrationController {

    @Autowired
    AppRegistrationService appRegistrationService;

    @Autowired
    AuthenticationService authenticationService;

    @GetMapping("/api/app-registrations")
    public Page<AppRegistration> getAppRegistrations(HttpServletRequest request,
                                                     @RequestParam(defaultValue = "0") Integer page,
                                                     @RequestParam(defaultValue = "10") Integer size,
                                                     @RequestParam(defaultValue = "") String search,
                                                     @RequestParam(defaultValue = "") String sort,
                                                     @RequestParam(defaultValue = "true") Boolean active) {
        authenticationService.authorizeRequest(request, "hamroauth", new String[] {Roles.SUPER_ADMIN.name()}, null);
        return appRegistrationService.getAllAppRegistrations(new RequestFilter(page, size, search, sort, active));
    }

    @GetMapping("/api/app-registrations/{id}")
    public AppRegistration getAppRegistrationById(HttpServletRequest request, @PathVariable Integer id) {
        authenticationService.authorizeRequest(request, "hamroauth", new String[] {Roles.SUPER_ADMIN.name()}, null);
        return appRegistrationService.geAppRegistrationById(id);
    }

    @DeleteMapping("/api/app-registrations/{id}")
    public void deleteAppRegistrationById(HttpServletRequest request,@PathVariable Integer id) {
        authenticationService.authorizeRequest(request, "hamroauth", new String[] {Roles.SUPER_ADMIN.name()}, null);
        appRegistrationService.removeAppRegistration(id);
    }

}
