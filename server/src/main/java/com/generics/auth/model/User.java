package com.generics.auth.model;

import com.generics.auth.constant.Gender;

import java.util.HashSet;
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
    private String firstName = "";

    @Size(min = 2, max = 255, message = "Characters should be between 2 and 255")
    private String middleName = "";

    @Size(min = 2, max = 255, message = "Characters should be between 2 and 255")
    private String lastName = "";

    @Enumerated(EnumType.STRING)
    private Gender gender = Gender.PRIVATE;

    private Date birthDate;

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
    private Set<AppRegistration> registrations = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch=FetchType.LAZY)
    private Set<RefreshToken> refreshTokens = new HashSet<>();

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    }, fetch=FetchType.LAZY)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();


}