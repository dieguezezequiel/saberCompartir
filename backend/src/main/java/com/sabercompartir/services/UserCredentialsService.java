package com.sabercompartir.services;

import com.sabercompartir.domain.User;
import com.sabercompartir.domain.UserCredentials;
import com.sabercompartir.repository.RequestRepository;
import com.sabercompartir.repository.UserCredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserCredentialsService implements IUserCredentialsService {
    
    @Autowired
    UserCredentialsRepository userCredentialsRepository;
    
    public User login(UserCredentials userCredentials){
        return null;
    }
    public UserCredentials findByUsername(String user){
        return userCredentialsRepository.findByUsername(user);
    }
    
    public void save(UserCredentials userCredentials){
        userCredentialsRepository.save(userCredentials);
    }
}
