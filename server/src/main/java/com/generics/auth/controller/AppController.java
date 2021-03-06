package com.generics.auth.controller;

import com.generics.auth.constant.Events;
import com.generics.auth.constant.Models;
import com.generics.auth.constant.Roles;
import com.generics.auth.model.*;
import com.generics.auth.object.RequestFilter;
import com.generics.auth.security.AuthenticationService;
import com.generics.auth.service.*;
import com.generics.auth.utils.Lazy;
import com.generics.auth.utils.Str;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    EventService eventService;

    @Autowired
    LocationService locationService;

    @Autowired
    UserRoleService userRoleService;

    @Autowired
    AppRegistrationService appRegistrationService;

    @Autowired
    AuthenticationService authenticationService;


    /**
     * Return all apps based on given filter
     *
     * @param page page number to get
     * @param size size of items in the response
     * @param search search query to be taken into account
     * @param sort sort option to include
     * @param active active record inclusion
     * @return Apps that match the given filters
     */
    @GetMapping("/api/apps")
    public Page<App> getApps(@RequestParam(defaultValue = "0") Integer page,
                             @RequestParam(defaultValue = "10") Integer size,
                             @RequestParam(defaultValue = "") String search,
                             @RequestParam(defaultValue = "") String sort,
                             @RequestParam(defaultValue = "true") Boolean active) {
        Page<App> appsPage = appService.getAllApps(new RequestFilter(page, size, search, sort, active));
        appsPage.getContent().forEach(app -> {
            Lazy.filterApp(app, true, false);
        });
        return appsPage;
    }

    /**
     * Create/Register an app with a verified token
     *
     * @param request authenticated request
     * @param appName name of app to be created
     * @param appPrivacy privacy setting of the app to be created
     * @param user admin user for the app
     * @return app registration object which has the app and user in it
     */
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

    /**
     * Get app by given name
     *
     * @param request authenticated request
     * @param appName name of the required app
     * @return app, if found
     */
    @GetMapping("/api/apps/{appName}")
    public App getAppByName(HttpServletRequest request,@RequestParam(defaultValue = "false") Boolean detail, @PathVariable String appName) {
        User requestUser = authenticationService.authorizeRequest(request, appName,  new String[] {Roles.USER.name()}, null);
        App app = appService.getAppByName(appName);
        boolean isAdmin = requestUser.getActiveRoles().contains(Roles.ADMIN.name());
        Lazy.filterApp(app, !detail, isAdmin);
        return app;
    }

    /**
     * Updates an app to the given app in request body
     *
     * @param request authenticated request
     * @param appName name of app to update
     * @param app app data to put
     * @return app if app exists and update is successful
     */
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

    /**
     * Updates an app to the given app in request body
     *
     * @param request authenticated request
     * @param appName name of app to update
     * @param isPublic app privacy to set
     * @return app if app exists and update is successful
     */
    @PostMapping("/api/apps/{appName}/privacy")
    public Object toggleAppPrivacy(HttpServletRequest request,@PathVariable String appName,@RequestParam(defaultValue = "true") Boolean isPublic) {
        User requestUser = authenticationService.authorizeRequest(request, appName,  new String[] {Roles.ADMIN.name()}, null);
        App updatedApp =  appService.updateAppPrivacy(appName, isPublic);
        eventService.track(Str.interpolate(Models.USER, "id", requestUser.getId()),
                isPublic ? Events.MADE_PUBLIC : Events.MADE_PRIVATE,
                Str.interpolate(Models.APP, "id", updatedApp.getId()),
                updatedApp);
        return new Object() {
            public final Boolean ok = true;
        };
    }

    /**
     * Login to the given 'appName'
     *
     * @param appName name to app to log in to
     * @param request raw request
     * @return tokens if login is successful
     */
    @PostMapping("/api/apps/{appName}/login")
    public Object login(@PathVariable String appName, HttpServletRequest request) {
        return authenticationService.loginRequest(request, appName);
    }

    /**
     * Logout from given app
     *
     * @param appName name of app to logout from
     * @param username username who is requesting the logout
     * @param request authenticated request
     * @param response response object for clearing cookies
     * @return JSON response
     */
    @PostMapping("/api/apps/{appName}/users/{username}/logout")
    public Object logout(@PathVariable String appName,@PathVariable String username, HttpServletRequest request, HttpServletResponse response) {
        App app = appService.getAppByName(appName);
        User requestUser = authenticationService.authorizeRequest(request, appName,  new String[] {Roles.USER.name()}, username);
        eventService.track(Str.interpolate(Models.USER, "id", requestUser.getId()),
                Events.LOGGED_OUT,
                Str.interpolate(Models.APP, "id", app.getId()),
                app);
       return authenticationService.logoutRequest(request, response, appName);
    }

    /**
     * Update location of given appName
     *
     * @param request authenticated request
     * @param appName name of app to update the location
     * @param location location to put in the app
     * @return location object which was put into DB
     */
    @PutMapping("/api/apps/{appName}/location")
    public Location updateAppLocation(HttpServletRequest request,@PathVariable String  appName, @RequestBody Location location) {
        authenticationService.authorizeRequest(request, appName, new String[] {Roles.ADMIN.name()}, null);
        return locationService.updateLocation(location.getId(), location);
    }

    /**
     * Update location of given appName
     *
     * @param request authenticated request
     * @param appName name of app to update the location
     * @param redirectUrl redirect URLs to put in the app
     * @return location object which was put into DB
     */
    @PutMapping("/api/apps/{appName}/redirect-url")
    public RedirectUrl updateAppRedirectUrl(HttpServletRequest request,@PathVariable String  appName, @RequestBody RedirectUrl redirectUrl) {
        authenticationService.authorizeRequest(request, appName, new String[] {Roles.ADMIN.name()}, null);

        return appService.updateRedirectUrl(redirectUrl.getId(), redirectUrl);
    }

    /**
     * Get redirect url of an app by given name
     *
     * @param appName name of the required app
     * @return redirect url, if the app exists
     */
    @GetMapping("/api/apps/{appName}/redirect-url")
    public RedirectUrl getAppRedirectUrl(@PathVariable String appName) {
        App app = appService.getAppByName(appName);
        return app.getRedirectUrl();
    }

    /**
     * Delete an app with the app name provided
     *
     * @param request authenticated request
     * @param appName name of app to be deleted
     */
    @DeleteMapping(value = "/api/apps/{appName}")
    public void deleteAppByName(HttpServletRequest request,@PathVariable String appName) {
        authenticationService.authorizeRequest(request, "hamroauth", new String[] {Roles.SUPER_ADMIN.name()}, null);
        appService.deleteAppByName(appName);
    }

}
