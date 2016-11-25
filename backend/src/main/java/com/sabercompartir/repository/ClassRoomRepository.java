package com.sabercompartir.repository;

import com.sabercompartir.domain.ClassRoom;
import com.sabercompartir.domain.ClassRoomState;
import com.sabercompartir.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by matias on 30/10/16.
 */
@Repository
public interface ClassRoomRepository extends JpaRepository<ClassRoom, Long> {

    ClassRoom findById(Long id);
    List<ClassRoom> findByState(ClassRoomState state);
    ClassRoom findByStateAndUser(ClassRoomState state, User user);
    Page<ClassRoom> findByState(ClassRoomState state, Pageable pageable);

    Page<ClassRoom> findAllByStateAndUser(ClassRoomState state, User user, Pageable pageable);

    Page<ClassRoom> findAllByGuestUsers(User guestUser, Pageable pageable);

    @Query("SELECT c FROM ClassRoom c WHERE c.name LIKE CONCAT('%',:searchValue,'%')")
    Page<ClassRoom> findAllBySearchValue(@Param("searchValue") String searchValue, Pageable pageable);
}
