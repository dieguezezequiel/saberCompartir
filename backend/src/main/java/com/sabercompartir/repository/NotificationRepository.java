package com.sabercompartir.repository;

import com.sabercompartir.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



/**
 * Created by cesar on 28/11/16.
 */
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT COUNT (n.id) FROM Notification n WHERE n.userId = :usuario AND n.status = false")
        Integer countAllBYUserUnread(@Param("usuario") Long usuario);

}
