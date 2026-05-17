package com.skillsprout.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizGenerationRequest {

    private String topic;

    private Integer numberOfQuestions;
}