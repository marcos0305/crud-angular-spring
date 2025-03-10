package service;

import java.util.List;
import java.util.Optional;


import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.marcos.crud_spring.exception.RecordNotFoundException;
import com.marcos.crud_spring.model.Course;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import repository.CourseRespository;

@Service
public class CourseService {

    private final CourseRespository courseRespository;

    public CourseService (CourseRespository courseRespository){
        this.courseRespository = courseRespository;
    }
     public List<Course> list(){
        return courseRespository.findAll();
    }

     public Course findById(@PathVariable @NotNull @Positive Long id){
      return courseRespository.findById(id).orElseThrow(() -> new RecordNotFoundException(id));
    }

     public Course create(@Valid Course course ){
       return courseRespository.save(course);
    }

    public Course update(@NotNull @Positive Long id, @Valid Course course){
        return courseRespository.findById(id)
        .map(recordFound -> {
            recordFound.setName(course.getName());
            recordFound.setCategory(course.getCategory());
            return courseRespository.save(recordFound);
        }).orElseThrow(() -> new RecordNotFoundException(id));
    }

        public void delete(@PathVariable @NotNull @Positive Long id){

            courseRespository.delete(courseRespository.findById(id).orElseThrow(() ->  new  RecordNotFoundException(id)));
        }
    }
