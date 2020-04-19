package com.generics.auth.model;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
public class App extends GenericModel {

    @Size(min = 3, max = 255, message = "Characters should be between 3 and 255")
    @Column(unique = true, nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToOne(cascade = CascadeType.ALL, fetch=FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "admin_id", referencedColumnName = "id")
    private User admin;

    @OneToMany(mappedBy = "app")
    private Set<AppRegistration> registrations = new HashSet<>();

    @OneToMany(mappedBy = "app")
    private Set<Event> events = new HashSet<>();

    public App(String name, User admin) {
        this.name = name;
        this.admin = admin;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getAdmin() {
        return admin;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }

    public Set<AppRegistration> getRegistrations() {
        return registrations;
    }

    public void setRegistrations(Set<AppRegistration> registrations) {
        this.registrations = registrations;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }
}
