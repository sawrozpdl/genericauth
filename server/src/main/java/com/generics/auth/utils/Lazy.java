package com.generics.auth.utils;

import com.generics.auth.model.App;
import com.generics.auth.model.User;
import com.generics.auth.model.UserRole;

import java.util.ArrayList;
import java.util.Set;

public class Lazy {

    public static <T> T getValueOrDefault(T value, T defaultValue) {
        return value == null ? defaultValue : value;
    }

    public static void filterUserForApp(User user, String appName) {
        Set<UserRole> userRoles = user.getRoles();
        ArrayList<String> roles = new ArrayList<>();
        userRoles.forEach(userRole -> {
            if (userRole.getApp().getName().equals(appName))
                roles.add(userRole.getRole().getName());
        });
        user.setRoles(null);
        user.setPassword("PRIVATE");
        user.setRefreshTokens(null);
        user.setRegistrations(null);
        user.setActiveApp(appName);
        user.setActiveRoles(roles);
    }

    public static void filterApp(App app, boolean deepFilter) {
        app.setCredential(null);
        app.setRedirectUrl(null);
        if (deepFilter) {
            app.setEvents(null);
            app.setRoles(null);
        }
    }
}
