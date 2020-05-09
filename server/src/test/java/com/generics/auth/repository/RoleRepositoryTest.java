package com.generics.auth.repository;

import com.generics.auth.model.Role;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RoleRepositoryTest {

    @Autowired
    RoleRepository roleRepository;

    @Test
    public void creates() {
        Role newRole = new Role("admin");

        Role created = roleRepository.save(newRole);

        Optional<Role> fetched = roleRepository.findById(created.getId());

        Assert.assertTrue(fetched.isPresent());

        Assert.assertEquals(fetched.get().getName(), "admin");
    }

    @Test
    public void updates() {
        Role newRole = new Role("admin");

        Role created = roleRepository.save(newRole);

        created.setName("superadmin");

        Role updated = roleRepository.save(created);

        Optional<Role> fetched = roleRepository.findById(created.getId());

        Assert.assertTrue(fetched.isPresent());

        Assert.assertEquals(fetched.get().getName(), "superadmin");
    }

    @Test
    public void deletes() {
        Role newRole = new Role("admin");

        Role created = roleRepository.save(newRole);

        roleRepository.deleteById(created.getId());

        Optional<Role> fetched = roleRepository.findById(created.getId());

        Assert.assertFalse(fetched.isPresent());
    }
}
