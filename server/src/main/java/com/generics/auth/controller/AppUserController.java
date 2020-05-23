package com.generics.auth.controller;

import com.generics.auth.constant.Events;
import com.generics.auth.constant.Models;
import com.generics.auth.constant.Roles;
import com.generics.auth.model.*;
import com.generics.auth.security.AuthenticationService;
import com.generics.auth.service.*;
import com.generics.auth.object.RequestFilter;
import com.generics.auth.utils.Str;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@RestController
public class AppUserController {

    @Autowired
    AppService appService;

    @Autowired
    UserService userService;

    @Autowired
    EventService eventService;

    @Autowired
    RoleService roleService;

    @Autowired
    UserRoleService userRoleService;

    @Autowired
    AppRegistrationService appRegistrationService;

    @Autowired
    AuthenticationService authenticationService;

    @GetMapping("/api/apps/{appName}/users")
    public Page<User> usersInApp(@PathVariable String appName,
                             @RequestParam(defaultValue = "0") Integer page,
                             @RequestParam(defaultValue = "10") Integer size,
                             @RequestParam(defaultValue = "") String search,
                             @RequestParam(defaultValue = "") String sort,
                             @RequestParam(defaultValue = "true") Boolean active) {
        return userService.getAllUsersInApp(appName, new RequestFilter(page, size, search, sort, active));
    }

    @GetMapping("/api/apps/{appName}/users/{username}")
    public User userInApp(@PathVariable String appName, @PathVariable String username) {

        return userService.getUserByUsernameForApp(username, appName);
    }

    @PostMapping("/api/apps/{appName}/users")
    public AppRegistration register(@PathVariable String appName, @RequestBody User user) {
        App app = appService.geAppByName(appName);

        if (user.getId() != null)
            return appRegistrationService.registerUser(app, user);

        User newUser = userService.createUser(user, app);

        Role role = roleService.getOrCreateRole(new Role(Roles.USER.name()));
        userRoleService.createUserRole(new UserRole(app, role, newUser));

        return  appRegistrationService.registerUser(app, newUser);
    }

    @PutMapping("/api/apps/{appName}/users/{username}")
    public User updateUser(HttpServletRequest request,
                           @PathVariable String appName,
                           @PathVariable String username,
                           @RequestBody User user) {
        User activeUser = authenticationService.authorizeRequest(request, appName, new String[] {Roles.USER.name()}, username);
        User updated = userService.updateUserByUsernameForApp(username, appName, user);

        App app = appService.geAppByName(appName);
        eventService.track(Str.interpolate(Models.USER, "id", activeUser.getId()),
                Events.UPDATED,
                Str.interpolate(Models.USER, "id", updated.getId()),
                app);

        return updated;
    }

    @PostMapping("/api/apps/{appName}/users/{username}/roles")
    public void promote(HttpServletRequest request,
                           @PathVariable String appName,
                           @PathVariable String username,
                           @RequestParam String roleName) {
        User user = userService.getUserByUsernameForApp(username, appName);
        App app = appService.geAppByName(appName);
        Role role = roleService.getOrCreateRole(new Role(roleName));
        userRoleService.createUserRole(new UserRole(app, role, user));
    }

    @DeleteMapping("/api/apps/{appName}/users/{username}")
    public void removeUserFromApp(@PathVariable String username, @PathVariable String appName) {
        AppRegistration registration = appRegistrationService.getAppRegistrationByAppNameAndUsername(username, appName);

        appRegistrationService.removeAppRegistration(registration.getId());

        User user = userService.getUserByUsernameForApp(username, appName);

        if (!appRegistrationService.hasUserRegistered(user.getId()))
            userService.deleteUserById(user.getId());

    }

}
