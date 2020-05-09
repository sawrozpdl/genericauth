package com.generics.auth.repository;

import com.generics.auth.model.App;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AppRepositoryTest {

    @Autowired
    AppRepository appRepository;

    @Test
    public void creates() {
        App newApp = new App("appy", true);

        App created = appRepository.save(newApp);

        Optional<App> fetched = appRepository.findById(created.getId());

        Assert.assertTrue(fetched.isPresent());

        Assert.assertEquals(fetched.get().getName(), "appy");
    }

    @Test
    public void updates() {
        App newApp = new App("appy", true);

        App created = appRepository.save(newApp);

        created.setName("mappy");

        App updated = appRepository.save(created);

        Optional<App> fetched = appRepository.findById(created.getId());

        Assert.assertTrue(fetched.isPresent());

        Assert.assertEquals(fetched.get().getName(), "mappy");
    }

    @Test
    public void deletes() {
        App newApp = new App("appy", true);

        App created = appRepository.save(newApp);

        appRepository.deleteById(created.getId());

        Optional<App> fetched = appRepository.findById(created.getId());

        Assert.assertFalse(fetched.isPresent());
    }
}
