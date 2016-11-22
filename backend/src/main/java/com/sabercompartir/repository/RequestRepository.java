package com.sabercompartir.repository;

import com.sabercompartir.domain.Request;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by matias on 18/11/16.
 */
public interface RequestRepository extends JpaRepository<Request, Long> {

    Request findById(Long id);

}
