package com.skillsprout.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseResponse {

    private Long id;

    private String title;

    private String description;

    private String category;

    private String difficulty;

    private String thumbnailUrl;

    private String instructorName;

    private String videoUrl;
}