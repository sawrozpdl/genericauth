package com.generics.auth.model;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
public class Profile extends GenericModel {

    @Column(columnDefinition = "TEXT")
    private String avatarUrl;

    @Column(columnDefinition = "TEXT")
    private String address;

    @OneToOne(mappedBy= "profile", cascade = CascadeType.ALL, fetch= FetchType.LAZY, orphanRemoval = true)
    private User user;

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
