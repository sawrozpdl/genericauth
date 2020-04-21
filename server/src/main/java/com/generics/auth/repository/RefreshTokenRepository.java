package com.generics.auth.repository;

import com.generics.auth.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer>, JpaSpecificationExecutor<RefreshToken> {

}