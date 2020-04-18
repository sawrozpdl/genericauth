package com.generics.auth.model;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
public class Profile extends GenericModel {

    @Size(min = 3, max = 65535)
    private String avatarUrl;

    @Size(min = 20, max = 65535)
    private String address;

    @OneToOne(mappedBy= "profile", cascade = CascadeType.ALL, fetch= FetchType.LAZY, orphanRemoval = true)
    private User user;
}
