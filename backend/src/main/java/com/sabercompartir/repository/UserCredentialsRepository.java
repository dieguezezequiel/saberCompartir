package com.sabercompartir.repository;

import com.sabercompartir.domain.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by cesar on 24/11/16.
 */
@Repository
public interface UserCredentialsRepository extends JpaRepository<UserCredentials, Long> {
    
    UserCredentials findByUsername(String Username);
    
}
