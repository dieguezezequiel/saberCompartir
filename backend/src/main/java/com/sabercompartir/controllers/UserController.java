package com.sabercompartir.controllers;

import com.sabercompartir.domain.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.sabercompartir.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping(UrlMappings.BASE + UrlMappings.USER)
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<User> getAll(){
        List<User> users = this.userService.getAll();

        return users;
    }


    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public Object save(@RequestBody User user){

        System.out.println("Se le pego joya al back");

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
