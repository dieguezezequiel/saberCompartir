package com.sabercompartir.domain;

import javax.persistence.*;

/**
 * Created by matias on 28/10/16.
 */
@Entity
@Table(name = "class")
public class Class {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Column(name = "name", nullable = false)
    private String name;
}
