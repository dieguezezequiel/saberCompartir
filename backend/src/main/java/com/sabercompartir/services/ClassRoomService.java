package com.sabercompartir.services;

import com.sabercompartir.domain.*;
import com.sabercompartir.repository.ClassRoomRepository;
import com.sabercompartir.repository.ClassRoomStateRepository;
import com.sabercompartir.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

/**
 * Created by matias on 30/10/16.
 */
@Service
public class ClassRoomService {
    private final Long PROGRAMADA = 1l;
    private final Long ESTABLECIDA = 2l;
    private final Long EN_CURSO = 3l;
    private final Long FINALIZADA = 4l;
    private final Long CANCELADA = 5l;

    @Autowired
    ClassRoomRepository classRoomRepository;

    @Autowired
    ClassRoomStateRepository classRoomStateRepository;

    @Autowired
    ClassRoomStateService classRoomStateService;

    @Autowired
    UserCredentialsService userCredentialsService;

    @Autowired
    UserService userService;

    public ClassRoom getClassRoomById(Long id) {
        return classRoomRepository.findById(id);
    }

    public Page<ClassRoom> getAll(Pageable pageable) {
        return classRoomRepository.findAll(pageable);
    }

    public List<ClassRoom> getByState(Long stateId) {
        ClassRoomState state = classRoomStateService.getStateById(stateId);

        return classRoomRepository.findByState(state);
    }

    public ClassRoom getClassroomEstablished(Principal userAuthenticated) {
        User user = userService.getUserByUsername(userAuthenticated.getName());
        ClassRoomState state = classRoomStateService.getStateById(ESTABLECIDA);

        ClassRoom classroom = classRoomRepository.findByStateAndUser(state, user);

        return classroom;
    }


    public void saveOrUpdate(ClassRoom classroom) {
        classRoomRepository.save(classroom);
    }

    public void create(Request request, Principal userAuthenticated) {
        UserCredentials userCredentials = this.userCredentialsService.findByUsername(userAuthenticated.getName());
        User user = userService.getUserByUsername(userAuthenticated.getName());
        ClassRoomState state = classRoomStateService.getStateById(PROGRAMADA);

        ClassRoom classroom = new ClassRoom();
        classroom.setName(request.getSubject());
        classroom.setState(state);
        classroom.setUser(user);
        classroom.setDescription("esto viene del front");


        classRoomRepository.save(classroom);
    }

    public Page<ClassRoom> getByStateAndOrdered(Long stateId, Pageable pageable) {
        ClassRoomState state = classRoomStateService.getStateById(stateId);

        return classRoomRepository.findByState(state, pageable);
    }

    public List<ClassRoomState> getClasRoomStates() {
        return classRoomStateRepository.findAll();
    }

    public Page<ClassRoom> getAllByStateAndUser(Long stateId, Long userId, Pageable pageable) {
        User user = userService.getUser(userId);
        ClassRoomState state = classRoomStateService.getStateById(stateId);

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
