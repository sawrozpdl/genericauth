package com.generics.auth.repository;

import com.generics.auth.model.RedirectUrl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RedirectUrlRepository extends JpaRepository<RedirectUrl, Integer>, JpaSpecificationExecutor<RedirectUrl> {

}