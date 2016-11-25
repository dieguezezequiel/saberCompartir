package com.sabercompartir.domain;

import javax.persistence.*;

/**
 * Created by matías on 24/11/16.
 */
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Column(name = "name", nullable = false)
    private String name;

    public Category(String name) {
        this.name = name;
    }

    public Category(){};

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
    }}
