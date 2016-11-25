package com.sabercompartir.services;

import com.sabercompartir.domain.User;

import java.util.List;

public interface IUserService {
    
    List<User> getAll();
    
    User save(User user);
    
    Object update(Integer id, User user);
    
    User getUser(Long id);
    
    User findByEmail(String email);
    
}
