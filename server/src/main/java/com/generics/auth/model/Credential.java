package com.generics.auth.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Credential extends GenericModel {

    @Column(unique = true, nullable = false, columnDefinition = "TEXT")
    private String clientId;

    @Column(unique = true, nullable = false, columnDefinition = "TEXT")
    private String clientSecret;

    @OneToOne(mappedBy= "credential", cascade = CascadeType.ALL, fetch= FetchType.LAZY)
    private App app;

    public Credential(App app) {
        this.app = app;
    }

    @PrePersist
    protected void onCreate() {
        clientId = "generate id";
        clientSecret = "generate secret";
    }
}
