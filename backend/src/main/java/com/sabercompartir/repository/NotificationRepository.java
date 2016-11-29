package com.sabercompartir.repository;

import com.sabercompartir.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



/**
 * Created by cesar on 28/11/16.
 */
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {



}
