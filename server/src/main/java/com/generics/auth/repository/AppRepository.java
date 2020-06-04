package com.generics.auth.repository;

import com.generics.auth.model.App;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface AppRepository  extends JpaRepository<App, Integer>, JpaSpecificationExecutor<App> {

    @Query(value = "select * from app where app.name like %:search%", nativeQuery = true)
    Page<App> findAll(String search, Pageable pageable);

    boolean existsByName(String name);

    Optional<App> findByName(String name);

    @Transactional
    void deleteByName(String name);
}
