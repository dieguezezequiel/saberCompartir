package com.sabercompartir.domain;

import java.util.Date;

/**
 * Created by cesar on 24/11/16.
 */
public class UserDTO {
    
    private Long id;
    private String username;
    private String password;
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private Date birthDate;
    
    public UserDTO(){}
    
    public UserDTO(Long id, String username, String password, Long userId, String firstName,
                   String lastName, String email, Date birthDate) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthDate = birthDate;
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
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
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
    
    public Date getBirthDate() {
        return birthDate;
    }
    
    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }
}
