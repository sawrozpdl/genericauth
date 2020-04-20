package com.generics.auth.model;

import javax.persistence.*;

@Entity
public class RedirectUrl extends GenericModel {

    @Column(columnDefinition = "TEXT")
    private String profileUrl;

    @Column(columnDefinition = "TEXT")
    private String authCallbackUrl;

    @Column(columnDefinition = "TEXT")
    private String baseUrl;

    @OneToOne(mappedBy= "redirectUrl", cascade = CascadeType.ALL, fetch= FetchType.LAZY)
    private App app;

    public RedirectUrl() {}

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }

    public String getAuthCallbackUrl() {
        return authCallbackUrl;
    }

    public void setAuthCallbackUrl(String authCallbackUrl) {
        this.authCallbackUrl = authCallbackUrl;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

//    public App getApp() {
//        return app;
//    }
//
//    public void setApp(App app) {
//        this.app = app;
//    }
}
