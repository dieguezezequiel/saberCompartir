package com.sabercompartir.repository;

import com.sabercompartir.domain.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by cesar on 24/11/16.
 */
public interface UserCredentialsRepository extends JpaRepository<UserCredentials, Long> {
    
    UserCredentials findByUsername(String Username);
    
}
