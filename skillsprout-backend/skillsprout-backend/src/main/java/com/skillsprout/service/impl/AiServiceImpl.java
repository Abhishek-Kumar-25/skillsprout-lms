package com.skillsprout.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillsprout.dto.AiResponse;
import com.skillsprout.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient.Builder webClientBuilder;

    private final ObjectMapper objectMapper =
            new ObjectMapper();

    @Override
    public AiResponse askQuestion(
            String question
    ) {

        try {

            String prompt =
                    """
                    You are an AI mentor for a Course Management System.
                    Explain in beginner friendly language.

                    Question:
                    """ + question;

            Map<String, Object> requestBody =
                    Map.of(
                            "contents",
                            new Object[]{
                                    Map.of(
                                            "parts",
                                            new Object[]{
                                                    Map.of(
                                                            "text",
                                                            prompt
                                                    )
                                            }
                                    )
                            }
                    );

            String response =
                    webClientBuilder
                            .build()
                            .post()
                            .uri(
                                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                                            + apiKey
                            )
                            .contentType(
                                    MediaType.APPLICATION_JSON
                            )
                            .bodyValue(
                                    requestBody
                            )
                            .retrieve()
                            .bodyToMono(String.class)
                            .block();

            JsonNode root =
                    objectMapper.readTree(response);

            String answer =
                    root
                            .path("candidates")
                            .get(0)
                            .path("content")
                            .path("parts")
                            .get(0)
                            .path("text")
                            .asText();

            return AiResponse.builder()
                    .answer(answer)
                    .build();

        } catch (Exception e) {

            String message = e.getMessage();

            if(message != null &&
                    message.contains("429")) {

                return AiResponse.builder()
                        .answer(
                                "AI service is temporarily busy. Please try again after 1 minute."
                        )
                        .build();
            }

            return AiResponse.builder()
                    .answer(
                            "Unable to process request currently."
                    )
                    .build();
        }
        }

    }