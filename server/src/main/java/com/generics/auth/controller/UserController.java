package com.generics.auth.controller;

import com.generics.auth.constant.Roles;
import com.generics.auth.model.Location;
import com.generics.auth.model.User;
import com.generics.auth.object.RequestFilter;
import com.generics.auth.security.AuthenticationService;
import com.generics.auth.service.LocationService;
import com.generics.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private LocationService locationService;

    @GetMapping("/api/users")
    public Page<User> getUsers(HttpServletRequest request,
                               @RequestParam(defaultValue = "0") Integer page,
                               @RequestParam(defaultValue = "10") Integer size,
                               @RequestParam(defaultValue = "") String search,
                               @RequestParam(defaultValue = "") String sort,
                               @RequestParam(defaultValue = "true") Boolean active) {
        authenticationService.authorizeRequest(request, "hamroauth", new String[] {Roles.SUPER_ADMIN.name()}, null);
        return userService.getAllUsers(new RequestFilter(page, size, search, sort, active));
    }

    @GetMapping("/api/users/{id}")
    public User getUserByUserName(HttpServletRequest request,@PathVariable Integer id) {
        authenticationService.authorizeRequest(request, "hamroauth", new String[] {Roles.SUPER_ADMIN.name()}, null);
        return userService.getUserById(id);
    }

    @PutMapping("/api/users/{id}/location")
    public Location updateUserLocation(HttpServletRequest request, @PathVariable Integer id, @RequestBody Location location) {
        authenticationService.authorizeRequest(request, "hamroauth", new String[] {Roles.SUPER_ADMIN.name()}, null);
        return locationService.updateLocation(location.getId(), location);
    }

    @DeleteMapping("/api/users/{id}")
    public Integer deleteUserByUserName(HttpServletRequest request,@PathVariable Integer  id) {
        authenticationService.authorizeRequest(request, "hamroauth", new String[] {Roles.SUPER_ADMIN.name()}, null);
        userService.deleteUserById(id);

        return id;
    }

}
