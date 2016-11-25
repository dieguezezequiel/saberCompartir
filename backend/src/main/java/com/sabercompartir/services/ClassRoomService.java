package com.sabercompartir.services;

import com.sabercompartir.domain.ClassRoom;
import com.sabercompartir.domain.ClassRoomState;
import com.sabercompartir.domain.Request;
import com.sabercompartir.domain.User;
import com.sabercompartir.repository.ClassRoomRepository;
import com.sabercompartir.repository.ClassRoomStateRepository;
import com.sabercompartir.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    ClassRoomStateRepository classRoomStateRepository;

    @Autowired
    UserService userService;

    public ClassRoom getClassRoomById(Long id) {
        return classRoomRepository.findById(id);
    }

    public Page<ClassRoom> getAll(Pageable pageable) {
        return classRoomRepository.findAll(pageable);
    }

    public List<ClassRoom> getByState(Integer state) {
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

    public Page<ClassRoom> getByStateAndOrdered(Integer state, Pageable pageable) {
        return classRoomRepository.findByState(state, pageable);
    }

    public List<ClassRoomState> getClasRoomStates() {
        return classRoomStateRepository.findAll();
    }

    public Page<ClassRoom> getAllByStateAndUser(Integer state, Long userId, Pageable pageable) {
        User user = userService.getUser(userId);
        return classRoomRepository.findAllByStateAndUser(state, user, pageable);
    }

    public Page<ClassRoom> getAllByGuestUsers(Long guestUserId, Pageable pageable) {
        User guestUser = userService.getUser(guestUserId);
        return classRoomRepository.findAllByGuestUsers(guestUser, pageable);
    }

    public Page<ClassRoom> getAllBySearch(String searchValue, Pageable pageable) {
        return classRoomRepository.findAllBySearchValue(searchValue,pageable);
    }
}
