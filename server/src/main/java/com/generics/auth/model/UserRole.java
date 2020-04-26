package com.generics.auth.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class UserRole extends GenericModel {

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "app_id")
    @JsonIgnoreProperties("roles")
    private App app;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("roles")
    private User user;

    public UserRole(App app, Role role, User user) {
        this.app = app;
        this.role = role;
        this.user = user;
    }

    public UserRole() {}

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
