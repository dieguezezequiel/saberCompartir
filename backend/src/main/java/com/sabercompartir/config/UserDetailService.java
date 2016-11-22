package com.sabercompartir.config;

import com.sabercompartir.domain.User;
import com.sabercompartir.repository.UserRepository;
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


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userService.findByUsername(username);
        if(user == null)
            return null;

        List<GrantedAuthority> gas = new ArrayList<GrantedAuthority>();

        org.springframework.security.core.userdetails.User userDetail
                = new org.springframework.security.core.userdetails
                .User(user.getUsername(), user.getPassword(), true, true, true, true, gas);

        return userDetail;

    }
}
