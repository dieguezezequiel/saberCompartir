package com.sabercompartir.controllers;

import com.sabercompartir.domain.ClassRoom;
import com.sabercompartir.domain.ClassRoomState;
import com.sabercompartir.domain.Request;
import com.sabercompartir.services.ClassRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

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
    public List<ClassRoom> getByState(@RequestParam("state") Integer state){
        List<ClassRoom> classes = this.classRoomService.getByState(state);

        return classes;
    }*/

    @RequestMapping(value = "", method = RequestMethod.GET, params={"state"})
    public Page<ClassRoom> getByStateAndOrdered(@RequestParam("state") Integer state, Pageable pageable){
        Page<ClassRoom> classes = this.classRoomService.getByStateAndOrdered(state, pageable);

        return classes;
    }

    @RequestMapping(value = "", method = RequestMethod.GET, params={"state", "user"})
    public Page<ClassRoom> getAllByStateAndUser(@RequestParam("state") Integer state, @RequestParam("user") Long user, Pageable pageable){
        Page<ClassRoom> classes = this.classRoomService.getAllByStateAndUser(state, user, pageable);

        return classes;
    }

    @RequestMapping(value = "", method = RequestMethod.GET, params={"guestUser"})
    public Page<ClassRoom> getAllByGuestUsers(@RequestParam("guestUser") Long guestUser, Pageable pageable){
        Page<ClassRoom> classes = this.classRoomService.getAllByGuestUsers(guestUser, pageable);

        return classes;
    }

    @RequestMapping(value = "/established", method = RequestMethod.GET)
    public ClassRoom getClassroomEstablished(){
        ClassRoom classroom = this.classRoomService.getClassroomEstablished();

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
}
