package com.generics.auth.service;

import com.generics.auth.model.App;
import com.generics.auth.model.AppRegistration;
import com.generics.auth.model.User;
import com.generics.auth.repository.AppRegistrationRepository;
import com.generics.auth.repository.AppRepository;
import com.generics.auth.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AppRegistrationServiceTest {

    @Mock
    AppRegistrationRepository appRegistrationRepository;

    @Mock
    AppRepository appRepository;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    AppRegistrationService appRegistrationService;

    @InjectMocks
    AppService appService;

    @InjectMocks
    UserService userService;

    @TestConfiguration
    public static class AppRegistrationServiceTestContextConfiguration {

        @Bean
        public AppRegistrationService appRegistrationService() {
            return new AppRegistrationService();
        }

        @Bean
        public AppService appService() {
            return new AppService();
        }

        @Bean
        public UserService userService() {
            return new UserService();
        }
    }

    App app;
    User user;
    AppRegistration registration;

    @Before
    public void mock() {
        app = new App("testapp", false);
        Mockito.when(appRepository.existsByName("testapp"))
                .thenReturn(false);
        Mockito.when(appRepository.save(app))
                .thenReturn(app);

        user = new User("saw", "this@app", "at site lol");
        Mockito.when(userRepository.existsByEmail("this@app"))
                .thenReturn(false);
        Mockito.when(userRepository.save(user))
                .thenReturn(user);

        registration = new AppRegistration(app, user);
        Mockito.when(appRegistrationRepository.save(registration))
                .thenReturn(registration);

        Mockito.when(appRegistrationRepository.findByUserNameAndAppName("saw", "testapp")).thenReturn(java.util.Optional.of(registration));
    }

    @Test
    public void registersUser() {
        App createdApp = appService.createApp(app);
        User createdUser = userService.createUser(user, createdApp);
        System.out.println(createdApp);

        appRegistrationService.registerUser(createdApp,createdUser);

        AppRegistration registration = appRegistrationService.getAppRegistrationByAppNameAndUsername(createdUser.getUsername(), createdApp.getName());

        Assert.assertEquals(registration.getApp(), createdApp);
        Assert.assertEquals(registration.getUser(), user);
    }
}
