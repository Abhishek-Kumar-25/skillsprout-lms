package com.skillsprout.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizSubmitRequest {

    private Long quizId;

    private List<QuizAnswerRequest> answers;
}