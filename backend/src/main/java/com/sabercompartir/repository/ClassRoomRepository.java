package com.sabercompartir.repository;

import com.sabercompartir.domain.ClassRoom;
import com.sabercompartir.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by matias on 30/10/16.
 */
public interface ClassRoomRepository extends JpaRepository<ClassRoom, Long> {

    ClassRoom findById(Long id);
    List<ClassRoom> findByState(Integer state);
    ClassRoom findByStateAndUser(Integer state, User user);
    Page<ClassRoom> findByState(Integer state, Pageable pageable);

    Page<ClassRoom> findAllByStateAndUser(Integer state, User user, Pageable pageable);

    Page<ClassRoom> findAllByGuestUsers(User guestUser, Pageable pageable);
}
