package com.skillsprout.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizResponse {

    private Long quizId;

    private String topic;

    private Integer totalQuestions;

    private List<QuestionResponse> questions;
}