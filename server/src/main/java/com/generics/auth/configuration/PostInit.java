package com.generics.auth.configuration;

import com.generics.auth.model.*;
import com.generics.auth.constant.Roles;
import com.generics.auth.service.*;
import com.generics.auth.utils.Gen;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class PostInit implements ApplicationRunner {


    private static final Logger logger = LoggerFactory.getLogger(PostInit.class);

    @Override
    public void run(ApplicationArguments args) throws Exception {
        logger.info("Generic Auth API Server Application started with options : {}", args.getOptionNames());
        seedDB();
    }

    @Autowired
    AppService appService;

    @Autowired
    UserService userService;

    @Autowired
    AppRegistrationService appRegistrationService;

    @Autowired
    RoleService roleService;

    @Autowired
    UserRoleService userRoleService;

    @Transactional
    public void seedDB() {
        try {
//            setRoles();
//            setSuperAdmin();
        } catch (Exception exc) {
            logger.info("DB Seed failed, Exception: ", exc);
        }
    }

    App godApp;
    User godAdmin;
    AppRegistration reg;
    Role superAdmin, admin, moderator, user, guest;

    private void setRoles() {
        Role superRole = new Role(Roles.SUPER_ADMIN.name());
        superRole.setActive(false);
        superAdmin = roleService.getOrCreateRole(superRole);
        admin = roleService.getOrCreateRole(new Role(Roles.ADMIN.name()));
        moderator = roleService.getOrCreateRole(new Role(Roles.MODERATOR.name()));
        user = roleService.getOrCreateRole(new Role(Roles.USER.name()));
        guest = roleService.getOrCreateRole(new Role(Roles.GUEST.name()));
    }

    private void setSuperAdmin() {
        godApp = appService.createApp(new App("floorgang", true));
        godAdmin = userService.createUser(
                new User("rickyrick",
                        "rickyrick@yopmail.com",
                        Gen.getMD5From("wabalabadubdub")),
                godApp);
        reg = appRegistrationService.registerUser(godApp, godAdmin);

        userRoleService.createUserRole(new UserRole(godApp, superAdmin, godAdmin));
        userRoleService.createUserRole(new UserRole(godApp, admin, godAdmin));
        userRoleService.createUserRole(new UserRole(godApp, user, godAdmin));
    }

}
