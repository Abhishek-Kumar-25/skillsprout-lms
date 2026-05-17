package com.skillsprout.service;

import com.skillsprout.dto.AiResponse;

public interface AiService {

    AiResponse askQuestion(
            String question
    );

}