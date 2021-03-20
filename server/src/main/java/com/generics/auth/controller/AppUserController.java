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

    /**
     * Get users that are registered in given app name
     *
     * @param request authenticated request
     * @param appName name of the app the users will be from
     * @param page page of data to fetch
     * @param size size of data to include in the page
     * @param search search query if any
     * @param sort sort method if any
     * @param active get active users or not
     * @return users matching such queries
     */
    @GetMapping("/api/apps/{appName}/users")
    public Page<User> usersInApp(HttpServletRequest request,
                                 @PathVariable String appName,
                             @RequestParam(defaultValue = "0") Integer page,
                             @RequestParam(defaultValue = "10") Integer size,
                             @RequestParam(defaultValue = "") String search,
                             @RequestParam(defaultValue = "") String sort,
                             @RequestParam(defaultValue = "true") Boolean active) {
        authenticationService.authorizeRequest(request, appName, new String[] {Roles.USER.name()}, null);
        App app = appService.getAppByName(appName);
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

    /**
     * Get single user from given appName if found
     *
     * @param request authenticated request
     * @param appName name of app the user will be from
     * @param username username of the user
     * @return user if found in the app
     */
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

    /**
     * Register given user to the app
     *
     * @param request authenticated request
     * @param appName name of the app to register
     * @param user user to register into
     * @return registration object if registration was successful
     */
    @PostMapping("/api/apps/{appName}/users")
    public AppRegistration register(HttpServletRequest request, @PathVariable String appName, @RequestBody User user) {
        App app = appService.getAppByName(appName);

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

    /**
     * Updates user by username and appName with given user in body
     *
     * @param request authenticated request
     * @param appName name of app the user is in
     * @param username username of the user
     * @param user user object to put into
     * @return user if the update was successful
     */
    @PutMapping("/api/apps/{appName}/users/{username}")
    public User updateUser(HttpServletRequest request,
                           @PathVariable String appName,
                           @PathVariable String username,
                           @RequestBody User user) {
        User activeUser = authenticationService.authorizeRequest(request, appName, new String[] {Roles.USER.name()}, username);
        User updated = userService.updateUserByUsernameForApp(username, appName, user);

        App app = appService.getAppByName(appName);
        eventService.track(Str.interpolate(Models.USER, "id", activeUser.getId()),
                Events.UPDATED,
                Str.interpolate(Models.USER, "id", updated.getId()),
                app);

        return updated;
    }

    /**
     * Add roles into given user of given appName
     *
     * @param request authenticated request
     * @param appName name of the app
     * @param username username of the user to promote
     * @param roleName name of the role to add
     */
    @PostMapping("/api/apps/{appName}/users/{username}/roles")
    public void promote(HttpServletRequest request,
                           @PathVariable String appName,
                           @PathVariable String username,
                           @RequestParam String roleName) {
        User activeUser = authenticationService.authorizeRequest(request, appName, new String[] {Roles.ADMIN.name()}, username);

        if (roleName.length() < 3) {
            throw new HttpException("Invalid role name", HttpStatus.BAD_REQUEST);
        }

        if (roleName.equals(Roles.GUEST.name()) || roleName.equals((Roles.USER.name()))) {
            throw new HttpException("Native roles can't be added!", HttpStatus.BAD_REQUEST);
        }

        User user = userService.getUserByUsernameForApp(username, appName);
        App app = appService.getAppByName(appName);
        Role role = roleService.getOrCreateRole(new Role(roleName));
        userRoleService.createUserRole(new UserRole(app, role, user));

        eventService.track(Str.interpolate(Models.USER, "id", activeUser.getId()),
                Events.PROMOTED,
                Str.interpolate(Models.USER, "id", user.getId()),
                app);
    }

    /**
     * Remove roles into given user of given appName
     *
     * @param request authenticated request
     * @param appName name of the app
     * @param username username of the user to demote
     * @param roleName name of the role to remove
     */
    @DeleteMapping("/api/apps/{appName}/users/{username}/roles")
    public void demote(HttpServletRequest request,
                        @PathVariable String appName,
                        @PathVariable String username,
                        @RequestParam String roleName) {
        User activeUser = authenticationService.authorizeRequest(request, appName, new String[] {Roles.ADMIN.name()}, username);
        User user = userService.getUserByUsernameForApp(username, appName);
        App app = appService.getAppByName(appName);

        Set<UserRole> userRoles = user.getRoles();
        final UserRole[] toDelete = {null};

        userRoles.forEach(userRole -> {
            if (userRole.getApp().getName().equals(appName)
                    && userRole.getRole().getName().equals(roleName))
                toDelete[0] = userRole;
        });

        if (toDelete[0] != null) {
            System.out.println(toDelete[0].getId());
            userRoleService.deleteUserRole(toDelete[0].getId());
            eventService.track(Str.interpolate(Models.USER, "id", activeUser.getId()),
                    Events.DEMOTED,
                    Str.interpolate(Models.USER, "id", user.getId()),
                    app);
        }
        else
            throw new HttpException(Error.missing("UserRole", "name", roleName), HttpStatus.NOT_FOUND);
    }

    /**
     * Disables the registration of the user in given appName
     *
     * @param request authenticated request
     * @param username username of the user to disable
     * @param appName name of the app the user exists in
     */
    @PostMapping("/api/apps/{appName}/users/{username}/disable")
    public void disableUserFromApp(HttpServletRequest request, @PathVariable String username, @PathVariable String appName) {
        User activeUser = authenticationService.authorizeRequest(request, appName, new String[] {Roles.ADMIN.name()}, username);
        AppRegistration registration = appRegistrationService.getAppRegistrationByAppNameAndUsername(username, appName);

        App app = appService.getAppByName(appName);

        appRegistrationService.disableAppRegistration(registration);

        eventService.track(Str.interpolate(Models.USER, "id", activeUser.getId()),
                registration.isActive() ? Events.BANNED : Events.UN_BANNED,
                Str.interpolate(Models.USER, "id", registration.getUser().getId()),
                app);

    }

    /**
     * Removes given user from given appName
     *
     * @param request authenticated request
     * @param username username of the user
     * @param appName name of the app to remove user from
     */
    @Transactional
    @DeleteMapping("/api/apps/{appName}/users/{username}")
    public void removeUserFromApp(HttpServletRequest request, @PathVariable String username, @PathVariable String appName) {
        User activeUser = authenticationService.authorizeRequest(request, appName, new String[] {Roles.ADMIN.name()}, username);
        AppRegistration registration = appRegistrationService.getAppRegistrationByAppNameAndUsername(username, appName);

        App app = appService.getAppByName(appName);

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
