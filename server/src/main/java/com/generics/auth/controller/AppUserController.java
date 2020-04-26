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

@RestController
public class AppUserController {

    @Autowired
    AppService appService;

    @Autowired
    UserService userService;

    @Autowired
    AppRegistrationService appRegistrationService;

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

        User newUser = userService.createUser(user, appName);

        return  appRegistrationService.registerUser(app, newUser);
    }

    @PutMapping("/api/apps/{appName}/users/{username}")
    public User updateUser(@PathVariable String appName,
                           @PathVariable String username,
                           @RequestBody User user) {

        return userService.updateUserByUsernameForApp(username, appName, user);
    }

    @DeleteMapping("/api/apps/{appName}/users/{username}")
    public void removeUserFromApp(@PathVariable String username, @PathVariable String appName) {
        AppRegistration registration = appRegistrationService.geAppRegistrationByAppNameAndUsername(username, appName);

        appRegistrationService.removeAppRegistration(registration.getId());

        User user = userService.getUserByUsernameForApp(username, appName);

        if (!appRegistrationService.hasUserRegistered(user.getId()))
            userService.deleteUserById(user.getId());

    }

}
