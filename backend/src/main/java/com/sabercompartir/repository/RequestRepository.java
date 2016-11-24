package com.sabercompartir.repository;

import com.sabercompartir.domain.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by matias on 18/11/16.
 */
public interface RequestRepository extends JpaRepository<Request, Long> {

    Request findById(Long id);

    @Query("SELECT r FROM Request r WHERE r.subject LIKE CONCAT('%',:searchValue,'%')")
    Page<Request> findAllBySearchValue(@Param("searchValue") String searchValue, Pageable page);

}

