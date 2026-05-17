package com.skillsprout.service;

import com.skillsprout.dto.QuizGenerationRequest;
import com.skillsprout.dto.QuizResponse;
import com.skillsprout.dto.QuizResultResponse;
import com.skillsprout.dto.QuizSubmitRequest;

public interface QuizService {

    QuizResponse generateQuiz(
            QuizGenerationRequest request
    );
    QuizResultResponse submitQuiz(
            QuizSubmitRequest request
    );
}