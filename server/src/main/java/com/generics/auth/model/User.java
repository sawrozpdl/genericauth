package com.generics.auth.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.generics.auth.constant.Gender;
import com.generics.auth.utils.Str;

import java.util.ArrayList;
import java.util.Set;
import java.util.Date;
import java.util.HashSet;
import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "\"user\"")
public class User extends GenericModel {

    @Size(min = 3, max = 255, message = "Characters should be between 3 and 255")
    @Column(nullable = false)
    private String username;

    @Size(min = 2, max = 255, message = "Characters should be between 2 and 255")
    private String firstName;

    @Size(min = 2, max = 255, message = "Characters should be between 2 and 255")
    private String middleName;

    @Size(min = 2, max = 255, message = "Characters should be between 2 and 255")
    private String lastName;

    @Enumerated(EnumType.STRING)
    private Gender gender = Gender.PRIVATE;

    private Date birthDate;

    @Column(unique = true, nullable = false)
    private String email;

    @Size(min = 8, message = "Minimum length: 8 characters")
    @Column(nullable = false, length = 255)
    private String password;

    @Size(min = 10)
    private String phoneNumber;

    private Date lastLogin;

    private transient String activeApp;

    private transient Boolean activeInApp;

    private transient ArrayList<String> activeRoles;

    @OneToOne(mappedBy= "user", cascade = CascadeType.ALL, fetch= FetchType.LAZY, orphanRemoval = true)
    private Profile profile;

    @OneToOne(cascade = CascadeType.ALL, fetch=FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch=FetchType.LAZY)
    @JsonIgnoreProperties({"app", "user"})
    private Set<AppRegistration> registrations = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch=FetchType.LAZY)
    @JsonIgnoreProperties({"user", "app", "role"})
    private Set<UserRole> roles = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch=FetchType.LAZY)
    private Set<RefreshToken> refreshTokens = new HashSet<>();

    public User() {}

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @PrePersist
    @Override
    protected void onCreate() {
        super.onCreate();
        this.location = new Location();
    }

    @Override
    public boolean equals(Object obj) {
        return  ((User) obj).getEmail().equals(this.getEmail());
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public void setActiveApp(String appName) {this.activeApp = appName;}

    public String getActiveApp() { return this.activeApp; }

    public void setActiveInApp(Boolean activeInApp) {this.activeInApp = activeInApp;}

    public Boolean getActiveInApp() { return this.activeInApp; }

    public void setActiveRoles(ArrayList<String> activeRoles) {this.activeRoles = activeRoles;}

    public ArrayList<String>  getActiveRoles() { return this.activeRoles; }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public Set<AppRegistration> getRegistrations() {
        return registrations;
    }

    public void setRegistrations(Set<AppRegistration> registrations) {
        this.registrations = registrations;
    }

    public Set<RefreshToken> getRefreshTokens() {
        return refreshTokens;
    }

    public void setRefreshTokens(Set<RefreshToken> refreshTokens) {
        this.refreshTokens = refreshTokens;
    }

    public Set<UserRole> getRoles() {
        return roles;
    }

    public void setRoles(Set<UserRole> roles) {
        this.roles = roles;
    }

    public Location getLocation() {
        return this.location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

}