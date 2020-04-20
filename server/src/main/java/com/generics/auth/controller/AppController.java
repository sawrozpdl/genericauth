package com.generics.auth.controller;

import com.generics.auth.model.App;
import com.generics.auth.model.AppRegistration;
import com.generics.auth.model.User;
import com.generics.auth.service.AppRegistrationService;
import com.generics.auth.service.AppService;
import com.generics.auth.service.UserService;
import com.generics.auth.store.RequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;


@RestController
public class AppController {


    @Autowired
    AppService appService;

    @Autowired
    UserService userService;

    @Autowired
    AppRegistrationService appRegistrationService;


    @GetMapping("/api/apps")
    public Page<App> getApps(@RequestParam(defaultValue = "1") Integer page,
                             @RequestParam(defaultValue = "10") Integer size,
                             @RequestParam(defaultValue = "") String search,
                             @RequestParam(defaultValue = "") String sort,
                             @RequestParam(defaultValue = "true") Boolean active) {
        return appService.getAllApps(new RequestFilter(page, size, search, sort, active));
    }

    @PostMapping("/api/apps")
    @Transactional
    public AppRegistration createApp(@RequestParam String appName,
                                     @RequestParam(defaultValue = "false") Boolean isPrivate,
                                     @RequestBody User user) {
        App createdApp = appService.createApp(new App(appName, isPrivate));
        User adminUser = user;
        System.out.println("ID before: " + adminUser.getId());
        if (user.getId() == null)
            adminUser = userService.createUser(user);
        System.out.println("ID after: " + adminUser.getId());
        return appRegistrationService.registerUser(createdApp, adminUser);
    }

    @GetMapping("/api/apps/{appName}")
    public App getAppByName(@PathVariable String appName) {
        return appService.geAppByName(appName);
    }

    @PutMapping("/api/apps/{appName}")
    public App updateAppByName(@PathVariable String appName, @RequestBody App app) {
        return appService.updateApp(appName, app);
    }

    @DeleteMapping(value = "/api/apps/{appName}")
    public void deleteAppByName(@PathVariable String appName) {
        appService.deleteAppByName(appName);
    }

}
