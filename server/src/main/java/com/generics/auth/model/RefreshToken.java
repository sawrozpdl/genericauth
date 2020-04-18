package com.generics.auth.model;

import javax.persistence.*;

@Entity
public class RefreshToken extends GenericModel {

    @Column(unique = true, nullable = false)
    private String token;

    @ManyToOne(cascade = CascadeType.ALL, fetch= FetchType.LAZY)
    private Device device;

    @ManyToOne(cascade = CascadeType.ALL, fetch= FetchType.LAZY)
    private User user;
}
