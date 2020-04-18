package com.generics.auth.model;

import java.util.Set;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
public class User extends GenericModel {

    @Size(min = 3, max = 255, message = "Characters should be between 3 and 255")
    @Column(unique = true, nullable = false)
    private String username;

    @Size(min = 2, max = 255, message = "Characters should be between 2 and 255")
    @Column(nullable = false)
    private String firstName;

    @Size(min = 2, max = 255, message = "Characters should be between 2 and 255")
    @Column(nullable = false)
    private String middleName;

    @Size(min = 2, max = 255, message = "Characters should be between 2 and 255")
    @Column(nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Size(min = 8, message = "Minimum length: 8 characters")
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Date lastLogin;

    @OneToOne(cascade = CascadeType.ALL, fetch=FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private Profile profile;

    @OneToMany(mappedBy = "user", fetch=FetchType.LAZY)
    private Set<AppRegistration> registrations;

    @OneToMany(mappedBy = "user", fetch=FetchType.LAZY)
    private Set<RefreshToken> refreshTokens;

    @ManyToMany(fetch=FetchType.LAZY)
    private Set<Role> roles;
}