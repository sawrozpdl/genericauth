package com.generics.auth.repository;

import com.generics.auth.model.App;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface AppRepository  extends JpaRepository<App, Integer> {

    boolean existsByName(String name);

    App findByName(String name);

    @Transactional
    void deleteByName(String name);
}
