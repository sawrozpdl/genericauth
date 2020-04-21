package com.generics.auth.repository;

import com.generics.auth.model.App;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import javax.transaction.Transactional;
import java.util.Optional;

public interface AppRepository  extends JpaRepository<App, Integer>, JpaSpecificationExecutor<App> {

    boolean existsByName(String name);

    Optional<App> findByName(String name);

    @Transactional
    void deleteByName(String name);
}
