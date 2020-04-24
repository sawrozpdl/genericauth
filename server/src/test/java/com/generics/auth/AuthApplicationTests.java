package com.generics.auth;

import com.generics.auth.model.App;
import com.generics.auth.repository.AppRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;


@RunWith(SpringRunner.class)
@DataJpaTest
class AuthApplicationTests {

	@Autowired
	AppRepository ap;

	@Test
	void contextLoads() {
	}

	@Test
	void testWorks() {
		App app = new App("saw", true);

		ap.save(app);

		Optional<App>  out = ap.findByName("saw");

		Assert.assertEquals("saw", app.getName());
	}

}
