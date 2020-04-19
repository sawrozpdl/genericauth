package com.generics.auth.controller;

import com.generics.auth.model.User;
import com.generics.auth.store.RequestFilter;
import com.generics.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/users")
    public Page<User> getUsers(@RequestParam(defaultValue = "1") Integer page,
                               @RequestParam(defaultValue = "10") Integer size,
                               @RequestParam(defaultValue = "") String search,
                               @RequestParam(defaultValue = "") String sort,
                               @RequestParam(defaultValue = "true") Boolean active) {

        return userService.getAllUsers(new RequestFilter(page, size, search, sort, active));
    }

    @GetMapping("/api/users/{username}")
    public User getUserByUserName(@PathVariable String username) {

        return userService.getUserByUsername(username);
    }

    @DeleteMapping("/api/users/{username}")
    public String  deleteUserByUserName(@PathVariable String  username) {
        userService.deleteUserByUsername(username);

        return username;
    }

}
