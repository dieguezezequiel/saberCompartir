package com.sabercompartir.domain;

import javax.persistence.*;

/**
 * Created by fede on 05/11/16.
 */

@Entity
@Table(name = "request")
public class Resquest {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Column(name = "subject", nullable = false)
    private String subject;
    @Column(name = "total_users", nullable = false)
    private String totalUsers;
    @Column(name = "points", nullable = false)
    private String points;
    @Column(name = "state", nullable = false)
    private String state;

    public Resquest() {
    }

    public Resquest(String subject, String totalUsers, String points, String state) {
        this.subject = subject;
        this.totalUsers = totalUsers;
        this.points = points;
        this.state = state;
    }

    public Long getId() {
        return id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(String totalUsers) {
        this.totalUsers = totalUsers;
    }

    public String getPoints() {
        return points;
    }

    public void setPoints(String points) {
        this.points = points;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
