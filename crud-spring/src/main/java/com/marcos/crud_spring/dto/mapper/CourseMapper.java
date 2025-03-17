package com.marcos.crud_spring.dto.mapper;

import org.springframework.stereotype.Component;
import com.marcos.crud_spring.model.Course;
import edu.kit.kastel.sdq.artemis4j.client.CourseDTO;

@Component
public class CourseMapper {

    public CourseDTO toDTO(Course course) {
        if (course == null) {
            return null;
        }
        return new CourseDTO(course.getId(), course.getName(), course.getCategory());
    }

    public Course toEntity(CourseDTO courseDTO) {
        if (courseDTO == null) {
            return null;
        }

        Course course = new Course();
        course.setId(courseDTO.id());
        course.setName(courseDTO.name());
        course.setCategory(courseDTO.category());
        return course;
    }
}