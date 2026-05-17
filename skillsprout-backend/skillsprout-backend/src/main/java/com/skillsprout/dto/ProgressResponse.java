package com.skillsprout.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressResponse {

    private Long enrollmentId;

    private String courseTitle;

    private Integer progress;

    private Integer xp;

    private Integer level;

    private String status;

}