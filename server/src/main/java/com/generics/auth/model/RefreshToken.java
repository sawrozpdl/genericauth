package com.generics.auth.model;

import javax.persistence.*;

@Entity
public class RefreshToken extends GenericModel {

    @Column(unique = true, nullable = false, length = 128)
    private String token;

    @ManyToOne(cascade = CascadeType.ALL, fetch= FetchType.LAZY)
    private Device device;

    @ManyToOne(cascade = CascadeType.ALL, fetch= FetchType.LAZY)
    private User user;

    public RefreshToken() {}

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
