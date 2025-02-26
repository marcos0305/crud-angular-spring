package com.marcos.crud_spring;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.marcos.crud_spring.model.Course;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import repository.CourseRespository;
import service.CourseService;

@Validated
@SuppressWarnings("unused")
@RestController
@RequestMapping ("/api/courses")
@AllArgsConstructor
public class CourseController {

    private final CourseRespository courseRespository; 
    private final CourseService courseService; 

    @GetMapping
    public List<Course> list(){
        return courseService.list();
    }

    @GetMapping("/{id}")
    public ResponseEntity <Course> findById(@PathVariable @NotNull @Positive Long id) {
        return courseService.findById(id)
        .map(recordFound -> ResponseEntity.ok().body(recordFound))
        .orElse(ResponseEntity.notFound().build());
    }

    //@RequestMapping(method = RequestMethod.POST)
    @PostMapping 
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course create(@RequestBody @Valid Course course ){
       return courseService.create(course);
    }
   
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable @NotNull @Positive long id){
      return courseRespository.findById(id)
        .map(recordFound -> {
           courseRespository.deleteById(id);
            return ResponseEntity.noContent().<Void>build();
        })
        .orElse(ResponseEntity.notFound().build());
    }
}
