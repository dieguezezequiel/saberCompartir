package com.sabercompartir.config;

import com.sabercompartir.domain.User;
import com.sabercompartir.domain.UserCredentials;
import com.sabercompartir.repository.UserRepository;
import com.sabercompartir.services.UserCredentialsService;
import com.sabercompartir.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by cesar on 19/11/16.
 */
@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    UserService userService;
    
    @Autowired
    UserCredentialsService userCredentialsService;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserCredentials userCredentials = userCredentialsService.findByUsername(username);
        if(userCredentials == null)
            return null;

        List<GrantedAuthority> gas = new ArrayList<GrantedAuthority>();

        org.springframework.security.core.userdetails.User userDetail
                = new org.springframework.security.core.userdetails
                .User(userCredentials.getUsername(), userCredentials.getPassword(), true, true, true, true, gas);

        return userDetail;

    }
}
