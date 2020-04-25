package com.generics.auth.repository;

import com.generics.auth.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.awt.print.Pageable;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {

    @Query("SELECT us.* from \"user\" as us " +
            "inner join app_registration as ar on us.id = ar.user_id " +
            "inner join app on app.id = ar.app_id " +
            "where us.username = :username and app.name = :appName")
    boolean existsByUsernameInApp(String username, String appName);

    boolean existsByEmail(String email);

    @Query("SELECT us.* from \"user\" as us " +
            "inner join app_registration as ar on us.id = ar.user_id " +
            "inner join app on app.id = ar.app_id " +
            "where us.username = :username and app.name = :appName")
    Optional<User> findUserByUsernameAndAppName(String username, String appName);

    @Query("SELECT us.* from \"user\" as us " +
            "inner join app_registration as ar on us.id = ar.user_id " +
            "inner join app on app.id = ar.app_id " +
            "where app.name = :appName")
    Page<User> findUsersByAppName(String AppName, Pageable pageable);

    @Transactional
    void deleteByUsername(String username);
}
