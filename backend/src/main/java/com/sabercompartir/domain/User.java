package com.sabercompartir.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by matias on 07/10/16.
 */
@Entity
@Table(name = "user")
public class User {

    @Id
    private Integer id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;
}
