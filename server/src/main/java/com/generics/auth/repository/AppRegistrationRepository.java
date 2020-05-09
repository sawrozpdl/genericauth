package com.generics.auth.repository;

import com.generics.auth.model.AppRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AppRegistrationRepository extends JpaRepository<AppRegistration, Integer>, JpaSpecificationExecutor<AppRegistration> {

    @Query(value = "select ar.* from  app_registration as ar " +
            "inner join app on ar.app_id  = app.id " +
            "inner join \"user\" as us on us.id = ar.user_id " +
            "where app.\"name\" = :appName and us.username = :username", nativeQuery = true)
    Optional<AppRegistration> findByUserNameAndAppName(String  username, String appName);

    boolean existsByUserId(Integer id);

}