package com.sabercompartir.domain;

import com.sabercompartir.enums.EstadoSolicitud;

import javax.persistence.*;
import java.util.List;

/**
 * Created by fede on 05/11/16.
 */

@Entity
@Table(name = "request")
public class Request {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Column(name = "subject", nullable = false)
    private String subject;
    @Column(name = "total_users", nullable = false)
    private Integer totalUsers;
    @Column(name = "points", nullable = false)
    private Integer points;
    @Column(name = "state", nullable = false)
    @Enumerated(EnumType.STRING)
    private EstadoSolicitud state;
//TODO hacer relacion solicitudes y usuarios
//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(name = "book_publisher", joinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "publisher_id", referencedColumnName = "id"))
//    private List<User> userList;

    public Request() {
    }

    public Request(String subject, Integer totalUsers, Integer points, EstadoSolicitud state) {
        this.subject = subject;
        this.totalUsers = totalUsers;
        this.points = points;
        this.state = state;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Integer getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(Integer totalUsers) {
        this.totalUsers = totalUsers;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public EstadoSolicitud getState() {
        return state;
    }

    public void setState(EstadoSolicitud state) {
        this.state = state;
    }
}
