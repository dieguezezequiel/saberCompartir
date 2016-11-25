package com.sabercompartir.controllers;

import com.sabercompartir.domain.ResponseFront;
import com.sabercompartir.domain.User;
import com.sabercompartir.domain.UserCredentials;
import com.sabercompartir.domain.UserDTO;
import com.sabercompartir.services.UserCredentialsService;
import org.springframework.http.HttpMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.sabercompartir.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.security.Principal;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping(UrlMappings.BASE + UrlMappings.USER)
public class UserController  extends HttpServlet {

    @Autowired
    private UserCredentialsService userCredentialsService;
    
    @Autowired
    private UserService userService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<User> getAll(){
        List<User> users = this.userService.getAll();
        return users;
    }


    @RequestMapping(value = "", method = RequestMethod.POST, produces="application/json")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseFront save(@RequestBody UserDTO user){
        UserCredentials found = userCredentialsService.findByUsername(user.getUsername());
       if(found == null){
            userService.save(new User(user.getFirstName(), user.getLastName(),user.getEmail(), user.getAge()));
            User userFound = userService.findByEmail(user.getEmail());
            userCredentialsService.save(new UserCredentials(user.getUsername(), new BCryptPasswordEncoder().encode(user.getPassword()), userFound.getId()));
            return ResponseFront.success("Bienvenido a saber compartir");
        }else{
            return ResponseFront.error("Ya existe un usuario registrado con el email ingresado");
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Object update(@PathVariable Integer id, @RequestBody User user){
        Object result = this.userService.update(id, user);

        return result;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable Long id){
        User user = this.userService.getUser(id);

        return user;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public User login(@RequestBody UserCredentials user) {
        UserCredentials result = userCredentialsService.findByUsername(user.getUsername());
        if(result != null) {
            if (new BCryptPasswordEncoder().matches(user.getPassword(), result.getPassword() ))
                return userService.getUser(result.getUserId());
        }


        return null;
    }
}
