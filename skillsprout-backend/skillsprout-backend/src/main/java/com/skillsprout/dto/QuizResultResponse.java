package com.skillsprout.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizResultResponse {

    private Integer score;

    private Integer totalQuestions;

    private Integer earnedXp;

    private Integer currentXp;

    private Integer currentLevel;
}