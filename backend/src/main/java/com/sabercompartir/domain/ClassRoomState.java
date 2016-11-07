package com.sabercompartir.domain;

import javax.persistence.*;

/**
 * Created by matias on 06/11/16.
 */
@Entity
@Table(name = "classroom_state")
public class ClassRoomState {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Column(name = "name", nullable = false)
    private String name;

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
}
