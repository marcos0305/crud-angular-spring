package com.marcos.crud_spring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.marcos.crud_spring.model.Course;

import repository.CourseRespository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@SuppressWarnings("unused")
	@Bean
	CommandLineRunner initDatabase(CourseRespository courseRespository){
		return args -> {
			courseRespository.deleteAll();

			Course c = new Course();
			c.setName("Angular com Spring");
			c.setCategory("Front-end");

			courseRespository.save(c);
		};
	}
}
