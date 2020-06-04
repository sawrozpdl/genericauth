package com.generics.auth.service;

import com.generics.auth.model.User;
import com.generics.auth.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    String appName = "gintama";

    String alien = "alien";

    User[] users = new User[] {
            new User("saw", "saw@i.com", "pass1"),
            new User("saw", "saw@i.com", "pass1"),
            new User("this", "this@i.com", "pass2"),
            new User("today", "today@i.com", "pass3")};

    @Before
    public void mock() {
        Mockito.when(userRepository.existsByUsernameInApp(users[0].getUsername(),
                appName)).thenReturn(true);
        Mockito.when(userRepository
                .existsByUsernameInApp(alien, appName)).thenReturn(false);
        Mockito.when(userRepository
                .findUserByUserNamePasswordAndAppName(users[1].getUsername(),
                users[1].getPassword(), appName))
                .thenReturn(java.util.Optional.ofNullable(users[1]));
        Mockito.when(userRepository.findUserByUsernameAndAppName(users[2].getUsername(),
                appName)).thenReturn(java.util.Optional.ofNullable(users[2]));
        Mockito.when(userRepository.save(users[3])).then(invocation -> null);
    }

    @Test
    public void validatesUserExistence() {
        User user = users[0];
        boolean userExists = userService.userExistsInApp(user.getUsername(), appName);

        Assert.assertTrue(userExists);

        boolean alienExists = userService.userExistsInApp(alien, appName);

        Assert.assertFalse(alienExists);
    }

    @Test
    public void authenticatesUser() {
        User user = users[1];
        User authenticated = userService.authenticateUser(user.getUsername(),
                user.getPassword(), appName);

        Assert.assertNotNull(authenticated);
    }

    @Test
    public void getsUserByUsername() {
        User user = users[2];

        User found = userService.getUserByUsernameForApp(user.getUsername(),
                appName);

        Assert.assertEquals(user, found);
    }

    @Test
    public void changesPassword() {
        User user = users[3];
        String oldPassword = user.getPassword();
        userService.changePassword(user, "newoneiscool");

        Assert.assertNotEquals(user.getPassword(), oldPassword);
    }}
