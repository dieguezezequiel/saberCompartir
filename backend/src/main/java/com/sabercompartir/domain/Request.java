package com.sabercompartir.domain;

import com.sabercompartir.enums.EstadoSolicitud;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

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
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "points", nullable = false)
    private Integer points;
    @Column(name = "state", nullable = false)
    @Enumerated(EnumType.STRING)
    private EstadoSolicitud state;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "requests_users", joinColumns = @JoinColumn(name = "request_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<User> joinedUsers;
    @Column(name = "date_request")
    private Date dateRequest;

    public Request() {
    }

    public Request(String subject, Integer totalUsers, Integer points, EstadoSolicitud state) {
        this.subject = subject;
        this.totalUsers = totalUsers;
        this.points = points;
        this.state = state;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<User> getJoinedUsers() {
        return joinedUsers;
    }

    public void setJoinedUsers(Set<User> joinedUsers) {
        this.joinedUsers = joinedUsers;
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

    public Date getDateRequest() {
        return dateRequest;
    }

    public void setDateRequest(Date dateRequest) {
        this.dateRequest = dateRequest;
    }
}
