package com.sabercompartir.repository;

import com.sabercompartir.domain.Request;
import com.sabercompartir.domain.User;
import com.sabercompartir.enums.EstadoSolicitud;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by matias on 18/11/16.
 */
public interface RequestRepository extends JpaRepository<Request, Long> {

    Request findById(Long id);

    Page<Request> findByStateAndUser(EstadoSolicitud state, User user, Pageable pageable);
}
