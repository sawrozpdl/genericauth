package com.generics.auth.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.generics.auth.exception.HttpException;
import com.generics.auth.utils.Gen;
import org.springframework.http.HttpStatus;

import javax.persistence.*;

@Entity
public class Credential extends GenericModel {

    @Column(unique = true, nullable = false, length = 128)
    private String clientId;

    @Column(unique = true, nullable = false, length = 128)
    private String clientSecret;

    @OneToOne(mappedBy= "credential", cascade = CascadeType.ALL, fetch= FetchType.LAZY)
    @JsonIgnoreProperties({"credential"})
    private App app;

    public Credential() {}

    public Credential(App app) {
        this.app = app;
        try {
            this.clientSecret = Gen.getMD5From(app.getName());
            this.clientId = Gen.base64Encode(app.getName() + app.getCreatedAt());
        } catch (Exception ignored) {
            throw new HttpException("Couldn't get credentials", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }
}
