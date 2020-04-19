package com.generics.auth.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class AppRegistration implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "app_id")
    private App app;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Date registeredAt;

    @PrePersist
    protected void onCreate() {
        registeredAt = new Date();
    }

    public AppRegistration(App app, User user) {
        this.app = app;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(Date registeredAt) {
        this.registeredAt = registeredAt;
    }
}
