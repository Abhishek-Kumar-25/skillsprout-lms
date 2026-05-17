package com.skillsprout.controller;

import com.skillsprout.dto.*;
import com.skillsprout.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @PostMapping("/generate")
    public ResponseEntity<QuizResponse>
    generateQuiz(
            @RequestBody
            QuizGenerationRequest request
    ){

        return ResponseEntity.ok(
                quizService.generateQuiz(
                        request
                )
        );
    }

    @PostMapping("/submit")
    public ResponseEntity<QuizResultResponse>
    submitQuiz(
            @RequestBody
            QuizSubmitRequest request
    ){

        return ResponseEntity.ok(
                quizService.submitQuiz(
                        request
                )
        );
    }
}