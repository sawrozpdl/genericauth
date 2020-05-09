package com.generics.auth.controller;

import com.generics.auth.model.AppRegistration;
import com.generics.auth.service.AppRegistrationService;
import com.generics.auth.object.RequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
public class AppRegistrationController {

    @Autowired
    AppRegistrationService appRegistrationService;

    @GetMapping("/api/app-registrations")
    public Page<AppRegistration> getAppRegistrations(@RequestParam(defaultValue = "0") Integer page,
                                                     @RequestParam(defaultValue = "10") Integer size,
                                                     @RequestParam(defaultValue = "") String search,
                                                     @RequestParam(defaultValue = "") String sort,
                                                     @RequestParam(defaultValue = "true") Boolean active) {
        return appRegistrationService.getAllAppRegistrations(new RequestFilter(page, size, search, sort, active));
    }

    @GetMapping("/api/app-registrations/{id}")
    public AppRegistration getAppRegistrationById(@PathVariable Integer id) {
        return appRegistrationService.geAppRegistrationById(id);
    }

    @DeleteMapping("/api/app-registrations/{id}")
    public void deleteAppRegistrationById(@PathVariable Integer id) {
        appRegistrationService.removeAppRegistration(id);
    }

}
