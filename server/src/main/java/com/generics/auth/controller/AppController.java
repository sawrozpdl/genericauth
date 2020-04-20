package com.generics.auth.controller;

import com.generics.auth.model.App;
import com.generics.auth.model.AppRegistration;
import com.generics.auth.model.User;
import com.generics.auth.service.AppService;
import com.generics.auth.service.UserService;
import com.generics.auth.store.RequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;


@RestController
public class AppController {


    @Autowired
    AppService appService;

    @Autowired
    UserService userService;


    @GetMapping("/api/apps")
    public Page<App> getApps(@RequestParam(defaultValue = "1") Integer page,
                             @RequestParam(defaultValue = "10") Integer size,
                             @RequestParam(defaultValue = "") String search,
                             @RequestParam(defaultValue = "") String sort,
                             @RequestParam(defaultValue = "true") Boolean active) {
        return appService.getAllApps(new RequestFilter(page, size, search, sort, active));
    }

    @PostMapping("/api/apps")
    public App createApp(@RequestParam String appName,
                         @RequestParam Boolean isPrivate,
                         @RequestBody User user) {
        App createdApp = appService.createApp(new App(appName, isPrivate));
        User createdUser = userService.createUser(user);

        AppRegistration reg = new AppRegistration(createdApp, createdUser);

        return createdApp;
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
