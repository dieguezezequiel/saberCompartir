package com.sabercompartir.controllers;

import com.sabercompartir.domain.*;
import com.sabercompartir.enums.EstadoSolicitud;
import com.sabercompartir.services.ClassRoomService;
import com.sabercompartir.services.RequestService;
import com.sabercompartir.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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
    private UserService userService;

    @Autowired
    private ClassRoomService classRoomService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Page<Request> getAll(Pageable pageable){
        return this.requestService.getAll(pageable);
    }

    @RequestMapping(value = "", method = RequestMethod.GET,params={"state"})
    public Page<Request> getAllTopNStatePendiente(Pageable pageable,@RequestParam("state") String state){
        return this.requestService.getAllTopAndState(pageable,state);
    }

    @RequestMapping(value = "", method = RequestMethod.POST,params={"userId"})
    public ResponseFront joinTheSolicitud(@RequestBody Request solicitud,@RequestParam("userId") Integer userId){
        if(solicitud.getJoinedUsers().contains(this.userService.getUser(userId.longValue()))){
            String mess = "Ya estas sumado a la solicitud de " + solicitud.getSubject();
            return ResponseFront.notice("Un momento!", mess);
        }else{
            solicitud.getJoinedUsers().add(this.userService.getUser(userId.longValue()));
            solicitud.setTotalUsers(solicitud.getJoinedUsers().size());
            this.requestService.save(solicitud);
            String mess = "Te acabas de sumar a la solicitud de " + solicitud.getSubject();
            return ResponseFront.success(mess);
        }
    }

    @RequestMapping(value = "", method = RequestMethod.GET, params={"searchValue"})
    public Page<Request> getAllBySearch(Pageable pageable, @RequestParam("searchValue") String searchValue){
        return this.requestService.getAllBySearch(searchValue, pageable);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Request getById(@PathVariable Long id){
        return this.requestService.getRequestById(id);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, params={"state", "user"})
    public Page<Request> getByStateAndUser(@RequestParam("state") String state, @RequestParam("user") String user, Pageable pageable){
        return this.requestService.getByStateAndUser(EstadoSolicitud.createFromString(state), user, pageable);
    }

    @RequestMapping(value = "/states", method = RequestMethod.GET)
    public List<EstadoSolicitud> getRequestStates(){
        return this.requestService.getRequestStates();
    }

    @RequestMapping(value = "/{id}/take", method = RequestMethod.POST)
    public void takeRequest(@PathVariable Long id, @RequestBody Request request, Principal userAuthenticated){
        this.requestService.update(id);

        this.classRoomService.create(request, userAuthenticated);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Long save(@RequestBody Request request, Principal user){
        return this.requestService.save(request, user);
    }
}
