package com.sabercompartir.domain;

import javax.persistence.*;

/**
 * Created by cesar on 28/11/16.
 */

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "message_type")
    private Integer messageType;
    @Column(name = "message")
    private String message;
    @Column(name = "status")
    private boolean status;
    @Column(name = "user_id")
    private Long userId;

    public Notification() {
    }

    public Notification(Integer messageType, String message, boolean status, Long userId) {
        this.messageType = messageType;
        this.message = message;
        this.status = status;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public Integer getMessageType() {
        return messageType;
    }

    public void setMessageType(Integer messageType) {
        this.messageType = messageType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
