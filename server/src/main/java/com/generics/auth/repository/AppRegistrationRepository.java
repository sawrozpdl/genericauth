package com.generics.auth.repository;

import com.generics.auth.model.AppRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AppRegistrationRepository extends JpaRepository<AppRegistration, Integer>, JpaSpecificationExecutor<AppRegistration> {

}