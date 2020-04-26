package com.generics.auth.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    @Column(nullable = false)
    private boolean isPrivate = false;

    @Column(columnDefinition = "TEXT")
    private String logoUrl;

    @Column(columnDefinition = "TEXT")
    private String bannerUrl;

    @OneToOne(cascade = CascadeType.ALL, fetch=FetchType.LAZY,orphanRemoval = true)
    @JoinColumn(name = "redirect_url_id", referencedColumnName = "id")
    private RedirectUrl redirectUrl;

    @OneToOne(cascade = CascadeType.ALL, fetch=FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "credential_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"app"})
    private Credential credential;

    @OneToOne(cascade = CascadeType.ALL, fetch=FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @OneToMany(mappedBy = "app", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"app", "user"})
    private Set<AppRegistration> registrations = new HashSet<>();

    @OneToMany(mappedBy = "app", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"app", "user"})
    private Set<UserRole> roles = new HashSet<>();

    @OneToMany(mappedBy = "app")
    private Set<Event> events = new HashSet<>();

    public App() {}

    public App(String name, Boolean isPrivate) {
        this.name = name;
        this.isPrivate = isPrivate;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }

    public RedirectUrl getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(RedirectUrl redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public Credential getCredential() {
        return credential;
    }

    public void setCredential(Credential credential) {
        this.credential = credential;
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

    public Set<UserRole> getRoles() {
        return roles;
    }

    public void setRoles(Set<UserRole> roles) {
        this.roles = roles;
    }
}
