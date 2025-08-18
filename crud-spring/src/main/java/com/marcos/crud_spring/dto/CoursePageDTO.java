package com.marcos.crud_spring.dto;

import java.util.List;

public record CoursePageDTO(List<CourseDTO> course, long totalElements, int totalPages) {

   
    
}
