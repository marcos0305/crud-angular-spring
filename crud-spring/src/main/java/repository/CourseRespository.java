package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.stereotype.Repository;

import com.marcos.crud_spring.model.Course;

@Repository
public interface CourseRespository extends JpaRepository<Course, Long> {

    BodyBuilder ok();
    
}