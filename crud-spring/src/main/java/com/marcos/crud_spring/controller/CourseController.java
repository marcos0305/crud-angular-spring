package com.marcos.crud_spring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.marcos.crud_spring.dto.CoursePageDTO;
import com.marcos.crud_spring.model.Course;

import edu.kit.kastel.sdq.artemis4j.client.CourseDTO;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import repository.CourseRespository;
import service.CourseService;

@Validated
@SuppressWarnings("unused")
@RestController
@RequestMapping ("/api/courses")

public class CourseController {

    private final CourseRespository courseRespository = null; 
    private final CourseService courseService = null; 

    @GetMapping
    public  CoursePageDTO list(@RequestParam(defaultValue = "0") @PositiveOrZero int page, @RequestParam(defaultValue = "10") @Positive @Max(100) int size) {
        return courseService.list(page, size);
    }

    @GetMapping("/{id}")
    public com.marcos.crud_spring.dto.CourseDTO findById(@PathVariable @NotNull @Positive Long id) {
        return courseService.findById(id);
    
    }

    @PostMapping 
    @ResponseStatus(code = HttpStatus.CREATED)
    public com.marcos.crud_spring.dto.CourseDTO create(@RequestBody @Valid @NotNull com.marcos.crud_spring.dto.@Valid @NotNull CourseDTO course ){
       return courseService.create(course);
    }

    @PutMapping("/{id}")
    public com.marcos.crud_spring.dto.CourseDTO update(@PathVariable @NotNull @Positive Long id,
     @RequestBody @Valid com.marcos.crud_spring.dto.@Valid @NotNull CourseDTO course){
        return courseService.update(id, course);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id){
           courseRespository.deleteAll();
        }
        
    
}

