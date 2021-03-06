package com.sabercompartir.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * Created by matias on 28/10/16.
 */
@Entity
@Table(name = "classroom")
public class ClassRoom {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "score")
    private Integer score;
    @Column(name = "date", nullable = false)
    private Date date;
    @Column(name = "description", nullable = false)
    private String description;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "state_id", nullable = false)
    private ClassRoomState state;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "classrooms_users", joinColumns = @JoinColumn(name = "classroom_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<User> guestUsers;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "classrooms_users_history", joinColumns = @JoinColumn(name = "classroom_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<User> guestUsersHistory;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "classrooms_joined_users", joinColumns = @JoinColumn(name = "classroom_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<User> joinedUsers;

    public ClassRoom() {
    }

    public Set<User> getGuestUsersHistory() {
        return guestUsersHistory;
    }

    public void setGuestUsersHistory(Set<User> guestUsersHistory) {
        this.guestUsersHistory = guestUsersHistory;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ClassRoomState getState() {
        return state;
    }

    public void setState(ClassRoomState state) {
        this.state = state;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<User> getGuestUsers() {
        return guestUsers;
    }

    public void setGuestUsers(Set<User> guestUsers) {
        this.guestUsers = guestUsers;
    }

    public Set<User> getJoinedUsers() {
        return joinedUsers;
    }

    public void setJoinedUsers(Set<User> joinedUsers) {
        this.joinedUsers = joinedUsers;
    }

    public void update(ClassRoom updatedClassRoom) {
        this.state = updatedClassRoom.getState();
        this.name = updatedClassRoom.getName();
    }
}
