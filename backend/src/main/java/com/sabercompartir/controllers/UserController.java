package com.sabercompartir.controllers;

import com.sabercompartir.domain.User;
import com.sabercompartir.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/**
 * Created by matias on 07/10/16.
 */
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Object getAll(){
        User user = this.userService.getAll();

        return (user != null ? user : new Object[]{} );
    }
}
