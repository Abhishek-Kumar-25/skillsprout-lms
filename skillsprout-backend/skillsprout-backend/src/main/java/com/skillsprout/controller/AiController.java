package com.skillsprout.controller;

import com.skillsprout.dto.AiRequest;
import com.skillsprout.dto.AiResponse;
import com.skillsprout.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/ask")
    public ResponseEntity<AiResponse>
    askQuestion(
            @RequestBody
            AiRequest request
    ){

        return ResponseEntity.ok(
                aiService.askQuestion(
                        request.getQuestion()
                )
        );
    }

}