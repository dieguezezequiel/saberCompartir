package com.sabercompartir.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

/**
 * Created by matias on 07/10/16.
 */
@Configuration
public class DatabaseConfiguration {

    @Primary
    @Bean(name = "saberCompartir")
    @ConfigurationProperties(prefix = "datasource.sabercompartir")
    public DataSource saberCompartirDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "saberCompartirJdbc")
    public JdbcTemplate saberCompartirJdbcTemplate(@Qualifier("saberCompartir") DataSource saberCompartir) {
        return new JdbcTemplate(saberCompartir);
    }

}
