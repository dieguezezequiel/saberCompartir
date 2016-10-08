package com.sabercompartir.controllers;

import com.sabercompartir.domain.User;
import com.sabercompartir.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Created by matias on 07/10/16.
 */
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<User> getAll(){
        List<User> users = this.userService.getAll();

        return users;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Object save(@RequestBody User user){

        try{
            Object result = this.userService.save(user);
            return result;

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Object update(@PathVariable Integer id, @RequestBody User user){
        Object result = this.userService.update(id, user);

        return result;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable Integer id){
        User user = this.userService.getUser(id);

        return user;
    }
}
