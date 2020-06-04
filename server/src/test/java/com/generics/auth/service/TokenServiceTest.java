package com.generics.auth.service;

import com.generics.auth.model.User;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

@RunWith(SpringRunner.class)
public class TokenServiceTest {

    @Mock
    UserService userService;

    @InjectMocks
    TokenService tokenService;

    private final User user = new User("saroj",
            "a@b.com", "boombaoom");

    @Before
    public void mock() {
        ReflectionTestUtils.setField(tokenService,
                "secret", "boombaoom");
        Optional<User> maybeUser = Optional.of(user);
        Mockito.when(userService
                .getUserByEmail(user.getEmail())).thenReturn(maybeUser);
    }

    @Test
    public void createsAndParsesToken() {
        String token = tokenService.createFor(user.getEmail());

        Assert.assertNotNull(token);

        User tokenUser = tokenService.parseToken(token);

        Assert.assertEquals(user.getUsername(), tokenUser.getUsername());
    }
}
