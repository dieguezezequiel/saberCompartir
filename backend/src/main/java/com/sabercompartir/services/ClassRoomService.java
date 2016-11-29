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
import java.util.Date;
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

    @Autowired
    CategoryService categoryService;

    @Autowired
    NotificationService notificationService;

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
        User user = userService.getUserByUsername(userAuthenticated.getName());
        ClassRoomState state = classRoomStateService.getStateById(PROGRAMADA);
        Category category = categoryService.getById(request.getCategory().getId());

        ClassRoom classroom = new ClassRoom();
        classroom.setName(request.getSubject());
        classroom.setState(state);
        classroom.setUser(user);
        classroom.setCategory(category);

        //TODO: QUITAR HARDCODEO
        classroom.setDescription("esto viene del front");
        classroom.setDate(new Date());

        classRoomRepository.save(classroom);

        notificationService.enviarMensajes(request,classroom.getId(), "La clase que solicitaste fue creada");
    }

    public Page<ClassRoom> getByStateAndOrdered(Long stateId, Pageable pageable) {
        ClassRoomState state = classRoomStateService.getStateById(stateId);

        return classRoomRepository.findByState(state, pageable);
    }

    public List<ClassRoomState> getClasRoomStates() {
        return classRoomStateRepository.findAll();
    }

    public Page<ClassRoom> getAllByStateAndUser(Long stateId, String username, Pageable pageable) {
        User user = userService.getUserByUsername(username);
        ClassRoomState state = classRoomStateService.getStateById(stateId);

        return classRoomRepository.findAllByStateAndUser(state, user, pageable);
    }

    public Page<ClassRoom> getAllByGuestUsers(String guestUserUsername, Pageable pageable) {
        User guestUser = userService.getUserByUsername(guestUserUsername);
        return classRoomRepository.findAllByGuestUsers(guestUser, pageable);
    }

    public Page<ClassRoom> getAllBySearch(String searchValue, Pageable pageable) {
        return classRoomRepository.findAllBySearchValue(searchValue, pageable);
    }

    public Long stream(Long id) {
        ClassRoom classRoom = classRoomRepository.getById(id);
        ClassRoomState classRoomState = classRoomStateService.getStateById(ESTABLECIDA);
        classRoom.setState(classRoomState);
        classRoomRepository.save(classRoom);

        return classRoom.getId();
    }

    public Page<ClassRoom> getAllByUser(String username, Pageable pageable) {
        User user = userService.getUserByUsername(username);

        return classRoomRepository.getByUser(user, pageable);
    }

    public Long join(Long id, Principal userAuthenticated) {
        User user = userService.getUserByUsername(userAuthenticated.getName());
        ClassRoom classroom = classRoomRepository.findById(id);

        if(!classroom.getGuestUsersHistory().contains(user)){
            classroom.getGuestUsersHistory().add(user);
        }
        classroom.getGuestUsers().add(user);

        classRoomRepository.save(classroom);

        return classroom.getId();
    }

    public Long unjoin(Long id, Principal userAuthenticated) {
        User user = userService.getUserByUsername(userAuthenticated.getName());
        ClassRoom classroom = classRoomRepository.findById(id);

        classroom.getGuestUsers().remove(user);
        classRoomRepository.save(classroom);

        return classroom.getId();

    }

    public Page<ClassRoom> getAllByGuestUsersHistory(String guestUserHistoryUsername, Pageable pageable) {
        User guestUserHistory = userService.getUserByUsername(guestUserHistoryUsername);
        return classRoomRepository.findAllByGuestUsersHistory(guestUserHistory, pageable);
    }

    public Long qualify(Long id, Principal userAuthenticated, Integer calification) {
        User user = userService.getUserByUsername(userAuthenticated.getName());
        ClassRoom classroom = classRoomRepository.findById(id);

        classroom.setScore(classroom.getScore() + calification);

        classRoomRepository.save(classroom);

        return classroom.getId();
    }
}
