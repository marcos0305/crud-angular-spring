package com.marcos.crud_spring.dto;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record CouseDTO(
        @JsonProperty("_id") Long id,
        @NotBlank @NotNull @Length(min = 5, max = 80) String name,
        @NotNull @Length(min = 10) @Pattern(regexp = "Back-end|Front-end") String category,
        @NotNull @Length(max = 10) @Length(max = 10) String status) {


}