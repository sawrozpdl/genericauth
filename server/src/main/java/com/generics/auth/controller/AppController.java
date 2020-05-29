package com.generics.auth.controller;

import com.generics.auth.constant.Events;
import com.generics.auth.constant.Models;
import com.generics.auth.model.*;
import com.generics.auth.constant.Roles;
import com.generics.auth.security.AuthenticationService;
import com.generics.auth.service.*;
import com.generics.auth.object.RequestFilter;
import com.generics.auth.utils.Lazy;
import com.generics.auth.utils.Str;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.lang.reflect.Array;


@RestController
public class AppController {

    @Autowired
    AppService appService;

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    EventService eventService;

    @Autowired
    LocationService locationService;

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
        Page<App> appsPage = appService.getAllApps(new RequestFilter(page, size, search, sort, active));
        appsPage.getContent().forEach(app -> {
            Lazy.filterApp(app, true);
        });
        return appsPage;
    }

    @PostMapping("/api/apps")
    @Transactional
    public AppRegistration createApp(HttpServletRequest request,
                                     @RequestParam String appName,
                                     @RequestParam(defaultValue = "false") Integer appPrivacy,
                                     @RequestBody User user) {
        Boolean isPrivate = appPrivacy == 1;
        User requestUser = authenticationService.authorizeRequest(request, null, null, null);
        user.setEmail(requestUser.getEmail());
        App createdApp = appService.createApp(new App(appName, isPrivate));
        User adminUser = requestUser;
        if (adminUser.getId() == null)
            adminUser = userService.createUser(user, createdApp);
        Role adminRole = roleService.getOrCreateRole(new Role(Roles.ADMIN.name()));
        Role userRole = roleService.getOrCreateRole(new Role(Roles.USER.name()));
        userRoleService.createUserRole(new UserRole(createdApp, adminRole, adminUser));
        userRoleService.createUserRole(new UserRole(createdApp, userRole, adminUser));

        eventService.track(Str.interpolate(Models.USER, "id", adminUser.getId()),
                Events.CREATED,
                Str.interpolate(Models.APP, "id", createdApp.getId()),
                createdApp);

        return appRegistrationService.registerUser(createdApp, adminUser);
    }

    @GetMapping("/api/apps/{appName}")
    public App getAppByName(HttpServletRequest request, @PathVariable String appName) {
        authenticationService.authorizeRequest(request, appName,  new String[] {Roles.ADMIN.name()}, null);
        App app = appService.geAppByName(appName);
        Lazy.filterApp(app, false);
        return app;
    }

    @PutMapping("/api/apps/{appName}")
    public App updateAppByName(HttpServletRequest request,@PathVariable String appName, @RequestBody App app) {
        User requestUser = authenticationService.authorizeRequest(request, appName,  new String[] {Roles.ADMIN.name()}, null);
        App updatedApp =  appService.updateApp(appName, app);
        eventService.track(Str.interpolate(Models.USER, "id", requestUser.getId()),
                Events.UPDATED,
                Str.interpolate(Models.APP, "id", updatedApp.getId()),
                updatedApp);
        return updatedApp;
    }

    @PostMapping("/api/apps/{appName}/login")
    public Object login(@PathVariable String appName, HttpServletRequest request, HttpServletResponse response) {
        return authenticationService.loginRequest(request, appName);
    }

    @PostMapping("/api/apps/{appName}/users/{username}/logout")
    public Object logout(@PathVariable String appName,@PathVariable String username, HttpServletRequest request, HttpServletResponse response) {
        App app = appService.geAppByName(appName);
        User requestUser = authenticationService.authorizeRequest(request, appName,  new String[] {Roles.USER.name()}, username);
        eventService.track(Str.interpolate(Models.USER, "id", requestUser.getId()),
                Events.LOGGED_OUT,
                Str.interpolate(Models.APP, "id", app.getId()),
                app);
       return authenticationService.logoutRequest(request, response, appName);
    }

    @PutMapping("/api/apps/{appName}/location")
    public Location updateAppLocation(HttpServletRequest request,@PathVariable String  appName, @RequestBody Location location) {
        authenticationService.authorizeRequest(request, "hamroauth", new String[] {Roles.SUPER_ADMIN.name()}, null);
        return locationService.updateLocation(location.getId(), location);
    }

    @DeleteMapping(value = "/api/apps/{appName}")
    public void deleteAppByName(HttpServletRequest request,@PathVariable String appName) {
        authenticationService.authorizeRequest(request, "hamroauth", new String[] {Roles.SUPER_ADMIN.name()}, null);
        appService.deleteAppByName(appName);
    }

}
