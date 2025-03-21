package com.marcos.crud_spring.dto.mapper;

import org.springframework.stereotype.Component;

import com.marcos.crud_spring.dto.CourseDTO;
import com.marcos.crud_spring.model.Course;

@Component
public class CourseMapper {
    
    public CourseDTO toDto(Course course){
        if (course == null){
            return null;
        }
        return new CourseDTO(course.getId(), course.getName(), course.getCategory(), null);
    }

    public Course toEntity(CourseDTO courseDTO) {

        if(courseDTO == null){
            return null;
        }

        Course course = new Course();
       if(courseDTO.id() != null){
        course.setId(courseDTO.id());
       }
       course.setName(courseDTO.name());
       course.setCategory(courseDTO.category());
        return course;
    }
}
