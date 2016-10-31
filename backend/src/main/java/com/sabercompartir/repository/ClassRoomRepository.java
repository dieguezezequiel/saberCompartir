package com.sabercompartir.repository;

import com.sabercompartir.domain.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by matias on 30/10/16.
 */
public interface ClassRoomRepository extends JpaRepository<ClassRoom, Long> {

    ClassRoom findById(Long id);
    ClassRoom findByState(Integer state);
}
