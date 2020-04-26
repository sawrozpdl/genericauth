package com.generics.auth.repository;

import com.generics.auth.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import javax.transaction.Transactional;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer>, JpaSpecificationExecutor<Role> {

    boolean existsByName(String name);

    Optional<Role> findByName(String  name);

    @Transactional
    void deleteByName(String name);
}