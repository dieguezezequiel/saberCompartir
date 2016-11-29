package com.sabercompartir.services;

import com.sabercompartir.domain.Notification;
import com.sabercompartir.domain.Request;
import com.sabercompartir.domain.User;
import com.sabercompartir.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Set;

/**
 * Created by cesar on 28/11/16.
 */
@Service
public class NotificationService {

    @Autowired
    NotificationRepository notificationRepository;

    void enviarMensajes(Request request, Long id, String message) {
        Set<User> users = request.getJoinedUsers();
        users.forEach(
                user -> {
                    Notification notification = new Notification();
                    notification.setMessage(message);
                    notification.setStatus(false);
                    notification.setUserId(user.getId());
                    notification.setMessageType(1);

                    notificationRepository.save(notification);
                });

    }
}
