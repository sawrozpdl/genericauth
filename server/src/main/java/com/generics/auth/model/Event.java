package com.generics.auth.model;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Event implements Serializable {

    @Id
    @GenericGenerator(
            name = "genericSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "EVENT_SEQUENCE"),
                    @Parameter(name = "initial_value", value = "1"),
                    @Parameter(name = "increment_size", value = "1")
            }
    )
    @GeneratedValue(generator = "genericSequenceGenerator")
    private Integer id;

    @Column(nullable = false)
    private String producer;

    @Column(nullable = false)
    private String action;

    @Column(nullable = false)
    private  String consumer;

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

    public Event(String producer, String action, String consumer) {
        this.producer = producer;
        this.action = action;
        this.consumer = consumer;
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
