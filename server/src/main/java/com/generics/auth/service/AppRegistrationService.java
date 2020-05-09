package com.generics.auth.service;

import com.generics.auth.exception.HttpException;
import com.generics.auth.model.App;
import com.generics.auth.model.AppRegistration;
import com.generics.auth.model.User;
import com.generics.auth.repository.AppRegistrationRepository;
import com.generics.auth.object.RequestFilter;
import com.generics.auth.utils.Error;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppRegistrationService {

    @Autowired
    AppRegistrationRepository appRegistrationRepository;

    public Page<AppRegistration> getAllAppRegistrations(RequestFilter filter) {
        return appRegistrationRepository.findAll(PageRequest.of(filter.page, filter.size));
    }

    public AppRegistration geAppRegistrationById(Integer id) {
        Optional<AppRegistration> appRegistration = appRegistrationRepository.findById(id);
        if (appRegistration.isPresent())
            return appRegistration.get();

        throw new HttpException(Error.missing("App Registration", "id", id), HttpStatus.NOT_FOUND);
    }

    public AppRegistration getAppRegistrationByAppNameAndUsername(String username, String appName) {
        Optional<AppRegistration> appRegistration = appRegistrationRepository.findByUserNameAndAppName(username, appName);
        if (appRegistration.isPresent())
            return appRegistration.get();

        throw new HttpException(Error.missing("Registration for" + appName, "username", username), HttpStatus.NOT_FOUND);
    }

    public AppRegistration registerUser(App app, User user) {
        return appRegistrationRepository.save(new AppRegistration(app, user));
    }

    public boolean hasUserRegistered(Integer userId) {
        return  appRegistrationRepository.existsByUserId(userId);
    }

    public void removeAppRegistration(Integer id) {
        if (appRegistrationRepository.existsById(id))
            appRegistrationRepository.deleteById(id);

        throw new HttpException(Error.missing("App Registration", "id", id), HttpStatus.NOT_FOUND);
    }

}
