package com.sabercompartir.repository;

import com.sabercompartir.domain.Request;
import com.sabercompartir.domain.User;
import com.sabercompartir.enums.EstadoSolicitud;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * Created by matias on 18/11/16.
 */
@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    Request findById(Long id);

    Page<Request> findByStateAndUser(EstadoSolicitud state, User user, Pageable pageable);

    @Query("SELECT r FROM Request r WHERE r.subject LIKE CONCAT('%',:searchValue,'%') and r.state <> :estado")
    Page<Request> findAllBySearchValue(@Param("searchValue") String searchValue, Pageable page,@Param("estado") EstadoSolicitud eliminada);

    Page<Request> findAllByState(Pageable pageable, EstadoSolicitud state);

    Request findByIdAndJoinedUsers_Id(Long solicitudId, long userId);

    Page<Request> findAllByStateNot(Pageable pageable, EstadoSolicitud eliminada);

}

