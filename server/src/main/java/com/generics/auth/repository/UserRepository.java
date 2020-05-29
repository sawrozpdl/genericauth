package com.generics.auth.repository;

import com.generics.auth.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {

    @Query(value = "SELECT (count(*) > 0) from \"user\" as us " +
            "inner join app_registration as ar on us.id = ar.user_id " +
            "inner join app on app.id = ar.app_id " +
            "where us.username = :username and app.name = :appName", nativeQuery = true)
    boolean existsByUsernameInApp(String username, String appName);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    @Query(value = "SELECT us.* from \"user\" as us " +
            "inner join app_registration as ar on us.id = ar.user_id " +
            "inner join app on app.id = ar.app_id " +
            "where us.username = :username and app.name = :appName", nativeQuery = true)
    Optional<User> findUserByUsernameAndAppName(String username, String appName);

    @Query(value = "SELECT us.* from \"user\" as us " +
            "inner join app_registration as ar on us.id = ar.user_id " +
            "inner join app on app.id = ar.app_id " +
            "where app.name = :appName and ar.is_active = :active and " +
            "(concat(us.first_name , ' ', us.middle_name ,us.last_name ) like %:search% " +
            "or us.username like %:search% or us.email like %:search%)", nativeQuery = true)
    Page<User> findUsersByAppName(String appName, String search, boolean active, Pageable pageable);

    @Query(value = "SELECT us.* from \"user\" as us " +
            "inner join app_registration as ar on us.id = ar.user_id " +
            "inner join app on app.id = ar.app_id " +
            "where (us.username = :username or us.email = :username) and us.password = :password and app.name = :appName", nativeQuery = true)
    Optional<User> findUserByUserNamePasswordAndAppName(String username, String password, String appName);

}
