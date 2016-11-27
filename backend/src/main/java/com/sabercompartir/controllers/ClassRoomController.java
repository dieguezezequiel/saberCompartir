package com.sabercompartir.controllers;

import com.sabercompartir.domain.ClassRoom;
import com.sabercompartir.domain.ClassRoomState;
import com.sabercompartir.domain.Request;
import com.sabercompartir.services.ClassRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * Created by matias on 30/10/16.
 */
@RestController
@CrossOrigin
@RequestMapping(UrlMappings.BASE + UrlMappings.CLASSROOM)
public class ClassRoomController {

    @Autowired
    private ClassRoomService classRoomService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Page<ClassRoom> getAll(Pageable pageable){
        Page<ClassRoom> classes = this.classRoomService.getAll(pageable);

        return classes;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ClassRoom getById(@PathVariable Long id){
        ClassRoom classRoom = this.classRoomService.getClassRoomById(id);

        return classRoom;
    }

/*    @RequestMapping(value = "", method = RequestMethod.GET, params={"state"})
    public List<ClassRoom> getByState(@RequestParam("state") Long state){
        List<ClassRoom> classes = this.classRoomService.getByState(state);

        return classes;
    }*/

    @RequestMapping(value = "", method = RequestMethod.GET, params={"state"})
    public Page<ClassRoom> getByStateAndOrdered(@RequestParam("state") Long state, Pageable pageable){
        Page<ClassRoom> classes = this.classRoomService.getByStateAndOrdered(state, pageable);

        return classes;
    }

    @RequestMapping(value = "", method = RequestMethod.GET, params={"user"})
    public Page<ClassRoom> getByUser(@RequestParam("user") String user, Pageable pageable){
        Page<ClassRoom> classes = this.classRoomService.getAllByUser(user, pageable);

        return classes;
    }

    @RequestMapping(value = "", method = RequestMethod.GET, params={"state", "user"})
    public Page<ClassRoom> getAllByStateAndUser(@RequestParam("state") Long state, @RequestParam("user") String user, Pageable pageable){
        Page<ClassRoom> classes = this.classRoomService.getAllByStateAndUser(state, user, pageable);

        return classes;
    }

    @RequestMapping(value = "", method = RequestMethod.GET, params={"guestUserHistory"})
    public Page<ClassRoom> getAllByGuestUsers(@RequestParam("guestUserHistory") String guestUserHistory, Pageable pageable){
        Page<ClassRoom> classes = this.classRoomService.getAllByGuestUsersHistory(guestUserHistory, pageable);

        return classes;
    }

    @RequestMapping(value = "/established", method = RequestMethod.GET)
    public ClassRoom getClassroomEstablished(Principal userAuthenticated){
        ClassRoom classroom = this.classRoomService.getClassroomEstablished(userAuthenticated);

        return classroom;
    }

    @RequestMapping(value = "/{classroomId}", method = RequestMethod.PUT)
    public void update(@PathVariable Long classroomId, @RequestBody ClassRoom updatedClassRoom){
        ClassRoom classroom = this.classRoomService.getClassRoomById(classroomId);
        classroom.update(updatedClassRoom);

        this.classRoomService.saveOrUpdate(classroom);
    }

    @RequestMapping(value = "/states", method = RequestMethod.GET)
    public List<ClassRoomState> getClasRoomStates(){
        List<ClassRoomState> classroomStateList = this.classRoomService.getClasRoomStates();

        return classroomStateList;
    }

    @RequestMapping(value = "", method = RequestMethod.GET, params={"searchValue"})
    public Page<ClassRoom> getAllBySearch(Pageable pageable, @RequestParam("searchValue") String searchValue){
        Page<ClassRoom> classRooms = this.classRoomService.getAllBySearch(searchValue, pageable);

        return classRooms;
    }

    @RequestMapping(value = "{id}/stream", method = RequestMethod.GET)
    public Long stream(@PathVariable Long id){
        return this.classRoomService.stream(id);
    }

    @RequestMapping(value = "{id}/join", method = RequestMethod.GET)
    public Long join(@PathVariable Long id, Principal userAuthenticated){
        return this.classRoomService.join(id, userAuthenticated);
    }

    @RequestMapping(value = "{id}/unjoin", method = RequestMethod.GET)
    public Long unjoin(@PathVariable Long id, Principal userAuthenticated){
        return this.classRoomService.unjoin(id, userAuthenticated);
    }
}
