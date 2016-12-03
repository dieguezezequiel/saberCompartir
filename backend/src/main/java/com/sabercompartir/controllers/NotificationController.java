package com.sabercompartir.controllers;


import com.sabercompartir.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


}
