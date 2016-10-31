package com.sabercompartir.services;

import com.sabercompartir.domain.ClassRoom;
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

    @Autowired
    ClassRoomRepository classRoomRepository;

    public ClassRoom getClassRoomById(Long id) {
        return classRoomRepository.findById(id);
    }

    public List<ClassRoom> getAll() {
        return classRoomRepository.findAll();
    }
}
