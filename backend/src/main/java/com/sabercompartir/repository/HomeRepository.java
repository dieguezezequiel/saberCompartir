package com.sabercompartir.repository;

import com.sabercompartir.domain.Resquest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeRepository extends JpaRepository<Resquest, Long> {

}
