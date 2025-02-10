package com.marcos.crud_spring;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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

import lombok.AllArgsConstructor;
import repository.CourseRespository;

@SuppressWarnings("unused")
@RestController
@RequestMapping ("/api/courses")
@AllArgsConstructor
public class CourseController {

    private final CourseRespository courseRespository; 

    @GetMapping
    public List<Course> list(){
        return courseRespository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity <Course> findById(@PathVariable Long id) {
        return courseRespository.findById(id)
        .map(record -> ResponseEntity.ok().body(record))
        .orElse(ResponseEntity.notFound().build());
    }

    //@RequestMapping(method = RequestMethod.POST)
    @PostMapping 
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course create(@RequestBody Course course ){
       return courseRespository.save(course);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable long id){
      return courseRespository.findById(id)
        .map(recordFound -> {
           courseRespository.deleteById(id);
            return ResponseEntity.noContent().<Void>build();
        })
        .orElse(ResponseEntity.notFound().build());
    }
}
