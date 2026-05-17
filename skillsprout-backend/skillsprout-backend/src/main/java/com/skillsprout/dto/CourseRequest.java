package com.skillsprout.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private String category;

    private String difficulty;

    private String thumbnailUrl;

    private String videoUrl;
}