package com.generics.auth.service;

import com.generics.auth.model.App;
import com.generics.auth.model.AppRegistration;
import com.generics.auth.model.User;
import com.generics.auth.repository.AppRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppRegistrationService {

    @Autowired
    AppRegistrationRepository appRegistrationRepository;

    public AppRegistration registerUser(App app, User user) {
        return appRegistrationRepository.save(new AppRegistration(app, user));
    }

}
