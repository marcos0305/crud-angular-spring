package service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.marcos.crud_spring.exception.RecordNotFoundException;
import com.marcos.crud_spring.dto.CourseDTO;
import com.marcos.crud_spring.dto.mapper.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import repository.CourseRespository;

@Service
public class CourseService {

    private final CourseRespository courseRespository;
    private final CourseMapper courseMapper;


    public CourseService(CourseRespository courseRespository, CourseMapper courseMapper) {
        this.courseRespository = courseRespository;
        this.courseMapper = courseMapper;
    }

    public List<CourseDTO> list() {
        return courseRespository.findAll()
        .stream()
        .map(courseMapper::toDto)
        .collect(Collectors.toList());
    }

    public CourseDTO findById(@NotNull @Positive Long id) {
        return courseRespository.findById(id)
                .map(courseMapper::toDto)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CourseDTO create(@Valid @NotNull CourseDTO course) {
        return courseMapper.toDto(courseRespository.save(courseMapper.toEntity(course)));
    }

   public CourseDTO update(@NotNull @Positive Long id, @Valid @NotNull CourseDTO course){
    return courseRespository.findById(id)
        .map(recordFound ->{
           recordFound.setName(course.name());
            recordFound.setCategory(course.category());
            return courseMapper.toDto(courseRespository.save(recordFound));
        }).orElseThrow(() ->new RecordNotFoundException(id));
   }

    public void delete(@PathVariable @NotNull @Positive Long id) {
        if (!courseRespository.existsById(id)) {
            throw new RecordNotFoundException(id);
        }
        courseRespository.deleteById(id);
    }
}