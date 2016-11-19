package com.sabercompartir.services;

import com.sabercompartir.domain.ClassRoom;
import com.sabercompartir.domain.Request;
import com.sabercompartir.domain.User;
import com.sabercompartir.repository.ClassRoomRepository;
import com.sabercompartir.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matias on 30/10/16.
 */
@Service
public class ClassRoomService {
    private final Integer PROGRAMADA = 1;
    private final Integer ESTABLECIDA = 2;
    private final Integer EN_CURSO = 3;
    private final Integer FINALIZADA = 4;
    private final Integer CANCELADA = 5;

    @Autowired
    ClassRoomRepository classRoomRepository;

    @Autowired
    UserService userService;

    public ClassRoom getClassRoomById(Long id) {
        return classRoomRepository.findById(id);
    }

    public List<ClassRoom> getAll() {
        return classRoomRepository.findAll();
    }

    public List<ClassRoom> getByState(Long state) {
        return classRoomRepository.findByState(state);
    }

    public ClassRoom getClassroomEstablished() {
        //TODO: OBTENER EL USUARIO LOGUEADO, Y NO MAPEAR A ENTIDAD!!!
        User user = userService.getUser(7l);

        ClassRoom classroom = classRoomRepository.findByStateAndUser(ESTABLECIDA, user);

        return classroom;
    }


    public void saveOrUpdate(ClassRoom classroom) {
        classRoomRepository.save(classroom);
    }

    public void create(Request request) {
        //TODO: OBTENER EL USUARIO LOGUEADO, Y NO MAPEAR A ENTIDAD!!!
        User user = userService.getUser(7l);

        ClassRoom classroom = new ClassRoom();
        classroom.setName(request.getSubject());
        classroom.setState(PROGRAMADA);
        classroom.setUser(user);
        classroom.setDescription("esto viene del front");


        classRoomRepository.save(classroom);
    }
}
