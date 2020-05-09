package com.generics.auth.repository;

import com.generics.auth.model.App;
import com.generics.auth.model.User;
import com.generics.auth.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer>, JpaSpecificationExecutor<UserRole> {

    @Query(value = "select role.name from  user_role as ur " +
            "inner join app on ur.app_id  = app.id " +
            "inner join \"user\" as us on us.id = ur.user_id " +
            "inner join role on role.id = ur.role_id " +
            "where app.name = :appName and us.username = :username", nativeQuery = true)
    List<String> findUserRolesInApp(String username, String appName);
}
