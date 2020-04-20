package com.generics.auth.service;

import com.generics.auth.exception.HttpException;
import com.generics.auth.model.App;
import com.generics.auth.repository.AppRepository;
import com.generics.auth.store.RequestFilter;
import com.generics.auth.utils.Error;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class AppService {

    @Autowired
    private AppRepository appRepository;

    public boolean appExists(String name) {
        return appRepository.existsByName(name);
    }

    public Page<App> getAllApps(RequestFilter filter) {
        return appRepository.findAll(PageRequest.of(filter.page, filter.size));
    }

    public App geAppByName(String name) {
        App app = appRepository.findByName(name);
        if (app == null) {
            throw new HttpException(Error.missing("App", "name", name), HttpStatus.NOT_FOUND);
        }
        return app;
    }

    public App createApp(App app) {
        if (appRepository.existsByName(app.getName())) {
            throw new  HttpException(Error.duplicate("App", "name", app.getName()), HttpStatus.BAD_REQUEST);
        }
        appRepository.save(app);
        return  app;
    }

    public App updateApp(String name, App newApp) {
        App app = appRepository.findByName(name);
        if (app == null) {
            throw new HttpException(Error.missing("App", "name", name), HttpStatus.NOT_FOUND);
        }
        newApp.setId(app.getId());
        return appRepository.save(newApp);
    }

    public void deleteAppByName(String name) {
        App app = appRepository.findByName(name);
        if (app == null) {
            throw new HttpException(Error.missing("App", "name", name), HttpStatus.NOT_FOUND);
        }

        appRepository.deleteByName(name);
    }
}
