package com.generics.auth.repository;

import com.generics.auth.model.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    public void creates() {
        User newUser = new User("test_username", "test@email.com", "hashedPassword");

        User created = userRepository.save(newUser);

        Optional<User> fetched = userRepository.findById(created.getId());

        Assert.assertTrue(fetched.isPresent());

        Assert.assertEquals(fetched.get().getEmail(), "test@email.com");
    }

    @Test
    public void updates() {
        User newUser = new User("test_username", "test@email.com", "hashedPassword");

        User created = userRepository.save(newUser);

        created.setEmail("changed@email.com");

        User updated = userRepository.save(created);

        Optional<User> fetched = userRepository.findById(created.getId());

        Assert.assertTrue(fetched.isPresent());

        Assert.assertEquals(fetched.get().getEmail(), "changed@email.com");
    }

    @Test
    public void deletes() {
        User newUser = new User("test_username", "test@email.com", "hashedPassword");

        User created = userRepository.save(newUser);

        userRepository.deleteById(created.getId());

        Optional<User> fetched = userRepository.findById(created.getId());

        Assert.assertFalse(fetched.isPresent());
    }
}
