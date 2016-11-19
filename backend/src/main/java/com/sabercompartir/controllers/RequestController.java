package com.sabercompartir.controllers;

import com.sabercompartir.domain.Request;
import com.sabercompartir.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by matias on 18/11/16.
 */
@RestController
@RequestMapping(UrlMappings.BASE + UrlMappings.REQUESTS)
public class RequestController {

    @Autowired
    private RequestService requestService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Request> getAll(){
        List<Request> requests = this.requestService.getAll();

        return requests;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Request getById(@PathVariable Long id){
        Request request = this.requestService.getRequestById(id);

        return request;
    }
}
