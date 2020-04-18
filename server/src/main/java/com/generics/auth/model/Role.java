package com.generics.auth.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
public class Role extends GenericModel {

    @Size(min = 3, max = 255, message = "Characters should be between 3 and 255")
    @Column(unique = true, nullable = false)
    private String name;

    @Size(min = 20, max = 65535)
    private String description;

    @ManyToMany
    private Set<User> users;

    @ManyToMany
    private Set<Permission> permissions;
}
