package com.marcos.crud_spring.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.marcos.crud_spring.dto.CourseDTO;
import com.marcos.crud_spring.dto.LessonDTO;
import com.marcos.crud_spring.model.Course;
import com.marcos.crud_spring.model.Lesson;

import enums.Category;


@Component
public class CourseMapper {
    
    public CourseDTO toDto(Course course){
        if (course == null){
            return null;
        }
        List<LessonDTO> lessons = course.getLessons()
        .stream()
        .map(lesson -> new LessonDTO(lesson.getId(),lesson.getName(), 
        lesson.getYoutubeUrl()))
        .collect(Collectors.toList());
        return new CourseDTO(course.getId(), course.getName(), course.getCategory(), lessons);
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

       List<Lesson> lessons = courseDTO.lessons().stream().map(lessonDTO ->{
        var lesson = new Lesson();
        lesson.setId(lessonDTO.id());
        lesson.setName(lessonDTO.name());
        lesson.setYoutubeUrl(lessonDTO.youtubeUrl());
        lesson.setCourse(course);
        return lesson;
       }).collect(Collectors.toList());

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
