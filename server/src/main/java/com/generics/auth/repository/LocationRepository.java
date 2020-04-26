package com.generics.auth.repository;

import com.generics.auth.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface LocationRepository extends JpaRepository<Event, Integer>, JpaSpecificationExecutor<Event> {

}