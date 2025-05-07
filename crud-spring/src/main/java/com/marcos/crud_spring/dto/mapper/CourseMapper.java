package com.marcos.crud_spring.dto.mapper;

import org.springframework.stereotype.Component;

import com.marcos.crud_spring.dto.CourseDTO;
import com.marcos.crud_spring.model.Course;

import enums.Category;
import lombok.val;

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
       course.setCategory(convertCategoryValue(courseDTO.category()));
        return course;
    }

     public String convertCategoryValue(String value){
        if (value == null) {
            return null;
        }
        return switch (value){
            case "Front-end" -> Category.FRONT_END.name();
            case "Back-end" -> Category.BACK_END.name();
            default -> throw new IllegalArgumentException("Categoria inválida: " + value);
        };
     }

}
