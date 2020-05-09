package com.generics.auth.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Event implements Serializable {

    @Id
    @GenericGenerator(
            name = "eventSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "EVENT_SEQUENCE"),
                    @Parameter(name = "initial_value", value = "1"),
                    @Parameter(name = "increment_size", value = "1")
            }
    )
    @GeneratedValue(generator = "eventSequenceGenerator")
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
    @JsonIgnoreProperties({"events"})
    private App app;

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getConsumer() {
        return consumer;
    }

    public void setConsumer(String consumer) {
        this.consumer = consumer;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    public Event() {}

    public Event(String producer, String action, String consumer, App app) {
        this.producer = producer;
        this.action = action;
        this.consumer = consumer;
        this.app = app;
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
