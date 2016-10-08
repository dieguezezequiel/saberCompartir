package com.sabercompartir.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by matias on 08/10/16.
 */
@Component
//TODO TIENE QUE IMPLEMENTAR LA INTERFAZ BASE
public class UserDAO{

    @Autowired
    @Qualifier("saberCompartirJdbc")
    private JdbcTemplate jdbcTemplateSC;


    private <T> T executeSql(JdbcTemplate database, String query, Object [] params, Class<T> clazz) {

        try {
            return database.queryForObject(query, params, clazz);
        } catch (EmptyResultDataAccessException e){
            return null;
        }
    }

    private <T> List executeSql(JdbcTemplate database, String query, Object[] params, BeanPropertyRowMapper mapper) {

        try {
            return database.query(query, params, mapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Short getUserById(Integer id){

        Object[] params = new Object[] {id};

        //ESTAS QUERYS HABRIA QUE VER DONDE LAS METEMOS, PORQUE ASI QUEDAN FEAS,
        //TODO ESTO ES FEO EN REALIDAD :D
        return  executeSql(jdbcTemplateSC,
                "select nombre" +
                        " from usuario" +
                        " Where id = ?",
                params,
                Short.class);
    }
}
