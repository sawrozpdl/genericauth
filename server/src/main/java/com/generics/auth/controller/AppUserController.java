package com.generics.auth.controller;

import com.generics.auth.constant.Events;
import com.generics.auth.constant.Models;
import com.generics.auth.constant.Roles;
import com.generics.auth.exception.HttpException;
import com.generics.auth.model.*;
import com.generics.auth.security.AuthenticationService;
import com.generics.auth.service.*;
import com.generics.auth.object.RequestFilter;
import com.generics.auth.utils.Error;
import com.generics.auth.utils.Lazy;
import com.generics.auth.utils.Str;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;

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
    public Page<User> usersInApp(HttpServletRequest request,
                                 @PathVariable String appName,
                             @RequestParam(defaultValue = "0") Integer page,
                             @RequestParam(defaultValue = "10") Integer size,
                             @RequestParam(defaultValue = "") String search,
                             @RequestParam(defaultValue = "") String sort,
                             @RequestParam(defaultValue = "true") Boolean active) {
        authenticationService.authorizeRequest(request, appName, new String[] {Roles.USER.name()}, null);
        App app = appService.geAppByName(appName);
        eventService.track(null,
                Events.FETCH_USERS,
                null,
                app);
        Page<User> usersPage = userService.getAllUsersInApp(appName, search, active, new RequestFilter(page, size, search, sort, active));
        usersPage.getContent().forEach(user -> {
            Lazy.filterUserForApp(user, appName);
        });
        return usersPage;
    }

    @GetMapping("/api/apps/{appName}/users/{username}")
    public User userInApp(HttpServletRequest request, @PathVariable String appName, @PathVariable String username) {
        authenticationService.authorizeRequest(request, appName, new String[] {Roles.USER.name()}, null);
        AppRegistration appRegistration = appRegistrationService.getAppRegistrationByAppNameAndUsername(username, appName);
        User user = appRegistration.getUser();
        App app = appRegistration.getApp();
        user.setActiveInApp(appRegistration.isActive());
        eventService.track(null,
                Events.FETCH_USER,
                Str.interpolate(Models.USER, "id", user.getId()),
                app);
        Lazy.filterUserForApp(user, appName);
        return user;
    }

    @PostMapping("/api/apps/{appName}/users")
    public AppRegistration register(HttpServletRequest request, @PathVariable String appName, @RequestBody User user) {
        App app = appService.geAppByName(appName);

        if (app.isPrivate()) {
            authenticationService.authorizeRequest(request, appName, new String[] {Roles.ADMIN.name()}, null);
        }

        if (user.getId() != null)
            return appRegistrationService.registerUser(app, user);

        User newUser = userService.createUser(user, app);

        Role role = roleService.getOrCreateRole(new Role(Roles.USER.name()));
        userRoleService.createUserRole(new UserRole(app, role, newUser));

        eventService.track(Str.interpolate(Models.USER, "id", newUser.getId()),
                Events.REGISTERED,
                Str.interpolate(Models.APP, "id", app.getId()),
                app);

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
        User activeUser = authenticationService.authorizeRequest(request, appName, new String[] {Roles.ADMIN.name()}, username);
        User user = userService.getUserByUsernameForApp(username, appName);
        App app = appService.geAppByName(appName);
        Role role = roleService.getOrCreateRole(new Role(roleName));
        userRoleService.createUserRole(new UserRole(app, role, user));

        eventService.track(Str.interpolate(Models.USER, "id", activeUser.getId()),
                Events.PROMOTED,
                Str.interpolate(Models.USER, "id", user.getId()),
                app);
    }

    @DeleteMapping("/api/apps/{appName}/users/{username}/roles")
    public void demote(HttpServletRequest request,
                        @PathVariable String appName,
                        @PathVariable String username,
                        @RequestParam String roleName) {
        User activeUser = authenticationService.authorizeRequest(request, appName, new String[] {Roles.ADMIN.name()}, username);
        User user = userService.getUserByUsernameForApp(username, appName);
        App app = appService.geAppByName(appName);

        Set<UserRole> userRoles = user.getRoles();
        AtomicBoolean deleted = new AtomicBoolean(false);
        userRoles.forEach(userRole -> {
            if (userRole.getApp().getName().equals(appName)) {
                if (userRole.getRole().getName().equals(roleName)) {
                    userRoleService.deleteUserRole(userRole.getId());
                    deleted.set(true);
                }
            }
        });

        if (deleted.get())
            eventService.track(Str.interpolate(Models.USER, "id", activeUser.getId()),
                    Events.DEMOTED,
                    Str.interpolate(Models.USER, "id", user.getId()),
                    app);
        else
            throw new HttpException(Error.missing("UserRole", "name", roleName), HttpStatus.NOT_FOUND);

    }

    @PostMapping("/api/apps/{appName}/users/{username}/disable")
    public void disableUserFromApp(HttpServletRequest request, @PathVariable String username, @PathVariable String appName) {
        User activeUser = authenticationService.authorizeRequest(request, appName, new String[] {Roles.ADMIN.name()}, username);
        AppRegistration registration = appRegistrationService.getAppRegistrationByAppNameAndUsername(username, appName);

        App app = appService.geAppByName(appName);

        appRegistrationService.disableAppRegistration(registration);

        eventService.track(Str.interpolate(Models.USER, "id", activeUser.getId()),
                registration.isActive() ? Events.BANNED : Events.UN_BANNED,
                Str.interpolate(Models.USER, "id", registration.getUser().getId()),
                app);

    }

    @Transactional
    @DeleteMapping("/api/apps/{appName}/users/{username}")
    public void removeUserFromApp(HttpServletRequest request, @PathVariable String username, @PathVariable String appName) {
        User activeUser = authenticationService.authorizeRequest(request, appName, new String[] {Roles.ADMIN.name()}, username);
        AppRegistration registration = appRegistrationService.getAppRegistrationByAppNameAndUsername(username, appName);

        App app = appService.geAppByName(appName);

        User user = userService.getUserByUsernameForApp(username, appName);

        appRegistrationService.removeAppRegistration(registration.getId());

        if (!appRegistrationService.hasUserRegistered(user.getId()))
            userService.deleteUserById(user.getId());

        eventService.track(Str.interpolate(Models.USER, "id", activeUser.getId()),
                Events.DELETED,
                Str.interpolate(Models.USER, "id", user.getId()),
                app);

    }

}
