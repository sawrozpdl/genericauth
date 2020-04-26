package com.generics.auth.controller;

import com.generics.auth.exception.HttpException;
import com.generics.auth.model.*;
import com.generics.auth.service.*;
import com.generics.auth.store.RequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;


@RestController
public class AppController {

    @Autowired
    AppService appService;

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    UserRoleService userRoleService;

    @Autowired
    AppRegistrationService appRegistrationService;

    @Autowired
    AuthenticationService authenticationService;


    @GetMapping("/api/apps")
    public Page<App> getApps(@RequestParam(defaultValue = "0") Integer page,
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
        if (user.getId() == null)
            adminUser = userService.createUser(user, appName);
        Role admin = roleService.getOrCreateRole(new Role("ADMIN"));
        userRoleService.createUserRole(new UserRole(createdApp, admin, adminUser));
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

    @PostMapping("/api/apps/{appName}/authorize")
    public User login(@PathVariable String appName, HttpServletRequest request, HttpServletResponse response) {
        return authenticationService.authenticateRequest(request, response, appName);
    }

    @PostMapping("/api/apps/{appName}/logout")
    public Object logout(@PathVariable String appName, HttpServletRequest request, HttpServletResponse response) {
       return authenticationService.logoutRequest(request, response, appName);
    }

    @DeleteMapping(value = "/api/apps/{appName}")
    public void deleteAppByName(@PathVariable String appName) {
        appService.deleteAppByName(appName);
    }

}
