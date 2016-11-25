package com.sabercompartir.services;

import com.sabercompartir.domain.User;
import com.sabercompartir.domain.UserCredentials;


public interface IUserCredentialsService {
    
    User login (UserCredentials userCredentials);
    
    UserCredentials findByUsername(String username);
    
    void save(UserCredentials userCredentials);
}

    
  
    

