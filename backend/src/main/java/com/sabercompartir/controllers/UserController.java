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
    public void save(@RequestBody User user){
        if(this.userService.getUserRegistro(user) == null){
            userService.save(user);
        }else{
            System.out.println("Ya existe un usuario con el mismo email registrado");
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

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public User getUserLogin(@RequestBody User user){
        return this.userService.getUserLogin(user);
    }
}
