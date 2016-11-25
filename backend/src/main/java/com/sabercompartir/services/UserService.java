package com.sabercompartir.services;

import com.sabercompartir.domain.User;
import com.sabercompartir.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService implements IUserService {

    @Autowired
    UserRepository userRepository;

    public List<User> getAll() {
        return null;
    }

    public User save(User user) {
       return  userRepository.save(user);
    }

    public Object update(Integer id, User user){
        return null;
    }

    public User getUser(Long id){
        return userRepository.findById(id);
    }
    
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    
}
