package com.sabercompartir.repository;

import com.sabercompartir.domain.ClassRoomState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by matias on 19/11/16.
 */
public interface ClassRoomStateRepository extends JpaRepository<ClassRoomState, Long> {

    List<ClassRoomState> findAll();

}


