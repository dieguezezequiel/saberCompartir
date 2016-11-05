package com.sabercompartir.controllers;

import com.sabercompartir.domain.Resquest;
import com.sabercompartir.services.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping(UrlMappings.BASE + UrlMappings.HOME)
public class HomeController {

    @Autowired
    private HomeService homeService;

    @RequestMapping(value = "", method = RequestMethod.GET, produces="application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<Resquest> getAll(){
        List<Resquest> solicitudes = this.homeService.getAll();

        return solicitudes;
    }
}
