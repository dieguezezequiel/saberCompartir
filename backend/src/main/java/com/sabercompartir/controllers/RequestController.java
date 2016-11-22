package com.sabercompartir.controllers;

import com.sabercompartir.domain.ClassRoom;
import com.sabercompartir.domain.Request;
import com.sabercompartir.services.ClassRoomService;
import com.sabercompartir.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by matias on 18/11/16.
 */
@RestController
@RequestMapping(UrlMappings.BASE + UrlMappings.REQUESTS)
public class RequestController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private ClassRoomService classRoomService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Page<Request> getAll(Pageable pageable){
        Page<Request> requests = this.requestService.getAll(pageable);

        return requests;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Request getById(@PathVariable Long id){
        Request request = this.requestService.getRequestById(id);

        return request;
    }

    @RequestMapping(value = "/{id}/take", method = RequestMethod.POST)
    public void takeRequest(@PathVariable Long id, @RequestBody Request request){
        this.requestService.update(id);
        this.classRoomService.create(request);
    }
}
