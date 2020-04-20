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

}
