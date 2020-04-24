package com.generics.auth.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class AppRegistration implements Serializable {

    @Id
    @GenericGenerator(
            name = "genericSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "GENERIC_SEQUENCE"),
                    @Parameter(name = "initial_value", value = "1"),
                    @Parameter(name = "increment_size", value = "1")
            }
    )
    @GeneratedValue(generator = "genericSequenceGenerator")
    private Integer id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "app_id")
    @JsonIgnoreProperties("registrations")
    private App app;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("registrations")
    private User user;

    private Date registeredAt;

    @PrePersist
    protected void onCreate() {
        registeredAt = new Date();
    }

    public AppRegistration() {}

    public AppRegistration(App app, User user) {
        this.app = app;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(Date registeredAt) {
        this.registeredAt = registeredAt;
    }
}
