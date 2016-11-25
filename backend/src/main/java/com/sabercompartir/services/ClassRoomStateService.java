package com.sabercompartir.services;

import com.sabercompartir.domain.ClassRoomState;
import com.sabercompartir.repository.ClassRoomStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by redbee on 25/11/16.
 */
@Service
public class ClassRoomStateService {

    @Autowired
    ClassRoomStateRepository classRoomStateRepository;

    public ClassRoomState getStateById(Long id) {
       return classRoomStateRepository.findById(id);
    }
}
