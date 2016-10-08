package com.sabercompartir;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@EnableAutoConfiguration(exclude = DataSourceAutoConfiguration.class)
@Configuration
@ComponentScan(basePackages = "com.sabercompartir")
public class SaberCompartirApplication {

	public static void main(String[] args) {
		SpringApplication.run(SaberCompartirApplication.class, args);
	}
}
