package com.marcos.crud_spring;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcos.crud_spring.model.Course;

import lombok.AllArgsConstructor;
import repository.CourseRespository;

@RestController
@RequestMapping ("/api/courses")
@AllArgsConstructor
public class CourseController {

    private final CourseRespository courseRespository; 

    @GetMapping
    public List<Course> list(){
        return courseRespository.findAll();
    }
}
