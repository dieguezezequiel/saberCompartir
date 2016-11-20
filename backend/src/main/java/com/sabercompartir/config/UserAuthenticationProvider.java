package com.sabercompartir.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Created by cesar on 19/11/16.
 */
@Component
public class UserAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {


    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken token)
            throws AuthenticationException {

        if(token.getCredentials() == null || userDetails.getPassword() == null){
            throw new BadCredentialsException("Null credentials forro");
        }

        if(!passwordEncoder.matches((String) token.getCredentials(), userDetails.getPassword())){
            throw new BadCredentialsException("Invalid credentials");
        }

    }

    @Override
    protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken token)
            throws AuthenticationException {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        return userDetails;
    }
}
