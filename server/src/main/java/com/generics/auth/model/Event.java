package com.generics.auth.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Event implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "app_id")
    private App app;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    public Event() {}

    public Event(String description) {
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }
}
