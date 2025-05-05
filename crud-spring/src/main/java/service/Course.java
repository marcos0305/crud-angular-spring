package service;

import java.util.Locale.Category;

import org.hibernate.validator.constraints.Length;

import enums.converters.CategoryConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.validation.constraints.Pattern;

public class Course {
    @Length(max = 10)
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    private Long id;

    @Length( min = 5, max = 100)
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 100, nullable = false)
    private String name;

    @Length(max = 10)
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    @Convert (converter = CategoryConverter.class)
    private Category category;

    @Length(max = 10)
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    private String status = "Ativo";

}
