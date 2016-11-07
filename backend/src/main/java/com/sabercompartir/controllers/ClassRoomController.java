package com.sabercompartir.controllers;

import com.sabercompartir.domain.ClassRoom;
import com.sabercompartir.domain.ClassRoomState;
import com.sabercompartir.services.ClassRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by matias on 30/10/16.
 */
@RestController
@RequestMapping(UrlMappings.BASE + UrlMappings.CLASSROOM)
public class ClassRoomController {

    @Autowired
    private ClassRoomService classRoomService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<ClassRoom> getAll(){
        List<ClassRoom> classes = this.classRoomService.getAll();

        return classes;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ClassRoom getById(@PathVariable Long id){
        ClassRoom classRoom = this.classRoomService.getClassRoomById(id);

        return classRoom;
    }

    @RequestMapping(value = "", method = RequestMethod.GET, params={"state"})
    public List<ClassRoom> getByState(@RequestParam("state") Long state){
        List<ClassRoom> classes = this.classRoomService.getByState(state);

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
}
