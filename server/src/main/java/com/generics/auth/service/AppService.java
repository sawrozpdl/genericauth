package com.generics.auth.service;

import com.generics.auth.exception.HttpException;
import com.generics.auth.model.App;
import com.generics.auth.model.Credential;
import com.generics.auth.model.RedirectUrl;
import com.generics.auth.repository.AppRepository;
import com.generics.auth.object.RequestFilter;
import com.generics.auth.repository.RedirectUrlRepository;
import com.generics.auth.utils.Error;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppService {

    @Autowired
    private AppRepository appRepository;

    @Autowired
    private RedirectUrlRepository redirectUrlRepository;

    public boolean appExists(String name) {
        return appRepository.existsByName(name);
    }

    public Page<App> getAllApps(RequestFilter filter) {
        return appRepository.findAll(filter.search, PageRequest.of(filter.page, filter.size));
    }

    public App geAppByName(String name) {
        Optional<App> app = appRepository.findByName(name);
        if (app.isPresent())
            return app.get();
        throw new HttpException(Error.missing("App", "name", name), HttpStatus.NOT_FOUND);
    }

    public RedirectUrl updateRedirectUrl(Integer redirectUrlId, RedirectUrl redirectUrl) {
        if (!redirectUrlRepository.existsById(redirectUrlId)) {
            throw new  HttpException(Error.missing("RedirectUrl", "id", redirectUrlId), HttpStatus.NOT_FOUND);
        }

        return redirectUrlRepository.save(redirectUrl);
    }

    public App createApp(App app) {
        if (appRepository.existsByName(app.getName())) {
            throw new  HttpException(Error.duplicate("App", "name", app.getName()), HttpStatus.BAD_REQUEST);
        }
        app.setCredential(new Credential(app));
        appRepository.save(app);
        return  app;
    }

    public App updateApp(String name, App newApp) {
        Optional<App> app = appRepository.findByName(name);
        if (app.isPresent()) {
            newApp.setId(app.get().getId());
            return appRepository.save(newApp);
        }
        throw new HttpException(Error.missing("App", "name", name), HttpStatus.NOT_FOUND);
    }

    public void deleteAppByName(String name) {
        if (appRepository.existsByName(name))
            appRepository.deleteByName(name);
        throw new HttpException(Error.missing("App", "name", name), HttpStatus.NOT_FOUND);
    }
}
