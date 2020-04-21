package com.generics.auth.model;

import javax.persistence.*;

@Entity
public class Credential extends GenericModel {

    @Column(unique = true, nullable = false, length = 128)
    private String clientId;

    @Column(unique = true, nullable = false, length = 128)
    private String clientSecret;

    @OneToOne(mappedBy= "credential", cascade = CascadeType.ALL, fetch= FetchType.LAZY)
    private App app;

    public Credential() {}

    public Credential(App app) {
        this.app = app;
    }

    @PrePersist
    protected void onCreate() {
        clientId = "generate id";
        clientSecret = "generate secret";
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }
}
