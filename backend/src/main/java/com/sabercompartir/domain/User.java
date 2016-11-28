package com.sabercompartir.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "user")
public class User{

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    @Column(name = "username", nullable = false)
    private String username;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "age", nullable = false)
    private Integer age;
/*    @ManyToMany(mappedBy = "guestUsersHistory")
    private Set<ClassRoom> classrooms;*/

    public User(){}
    
    public User(String username, String firstName, String lastName, String email, Integer age) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Integer getAge() {
        return age;
    }
    
    public void setAge(Integer age) {
        this.age = age;
    }
    
/*    public Set<ClassRoom> getClassrooms() {
        return classrooms;
    }
    
    public void setClassrooms(Set<ClassRoom> classrooms) {
        this.classrooms = classrooms;
    }*/
}
