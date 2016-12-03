package com.sabercompartir.controllers;


import com.sabercompartir.domain.Notification;
import com.sabercompartir.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by cesar on 02/12/16.
 */
@RestController
@CrossOrigin
@RequestMapping(UrlMappings.BASE + UrlMappings.NOTIFICATIONS)
public class NotificationController {


    @Autowired
    NotificationService notificationService;

    @RequestMapping(value = "/{user}/find", method = RequestMethod.GET)
    public Integer countUnread(@PathVariable Long user){
        return notificationService.contarMensajesSinLeer(user);
    }


    @RequestMapping(value = "/{user}/read", method = RequestMethod.POST)
    public void readMessages(@PathVariable Long user) {notificationService.leerMensajes(user);}


    @RequestMapping(value = "/{user}/all" , method = RequestMethod.GET)
    public List<Notification> getAll(@PathVariable Long user){return notificationService.getAll(user);}

}
