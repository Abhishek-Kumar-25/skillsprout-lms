package com.skillsprout.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillsprout.dto.*;
import com.skillsprout.entity.Question;
import com.skillsprout.entity.Quiz;
import com.skillsprout.entity.QuizAttempt;
import com.skillsprout.entity.User;
import com.skillsprout.exception.ResourceNotFoundException;
import com.skillsprout.repository.QuestionRepository;
import com.skillsprout.repository.QuizAttemptRepository;
import com.skillsprout.repository.QuizRepository;
import com.skillsprout.repository.UserRepository;
import com.skillsprout.service.QuizService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl
        implements QuizService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient.Builder
            webClientBuilder;

    private final QuizRepository
            quizRepository;

    private final QuestionRepository
            questionRepository;

    private final QuizAttemptRepository
            quizAttemptRepository;

    private final UserRepository
            userRepository;

    private final ObjectMapper objectMapper =
            new ObjectMapper();

    @Override
    public QuizResponse generateQuiz(
            QuizGenerationRequest request
    ) {

        try {

            // VALIDATION

            if (request.getTopic() == null
                    || request.getTopic().isBlank()) {

                throw new RuntimeException(
                        "Quiz topic cannot be empty"
                );
            }

            if (request.getNumberOfQuestions() <= 0) {

                throw new RuntimeException(
                        "Number of questions must be greater than 0"
                );
            }

            String prompt =
                    """
                    Generate %d multiple choice questions on topic: %s
                    
                    STRICT RULES:
                    
                    1. Return ONLY valid JSON
                    2. No markdown
                    3. No explanation
                    4. No extra text
                    5. Correct answer must only be:
                       A or B or C or D
                    
                    JSON FORMAT:
                    
                    [
                      {
                        "question":"What is Java?",
                        "optionA":"Programming Language",
                        "optionB":"Database",
                        "optionC":"Browser",
                        "optionD":"OS",
                        "correctAnswer":"A"
                      }
                    ]
                    """
                            .formatted(
                                    request.getNumberOfQuestions(),
                                    request.getTopic()
                            );

            Map<String, Object> requestBody =
                    Map.of(
                            "contents",
                            List.of(
                                    Map.of(
                                            "parts",
                                            List.of(
                                                    Map.of(
                                                            "text",
                                                            prompt
                                                    )
                                            )
                                    )
                            )
                    );

            String response =
                    webClientBuilder
                            .build()
                            .post()
                            .uri(
                                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="
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

            if (response == null
                    || response.isBlank()) {

                throw new RuntimeException(
                        "Empty response received from Gemini API"
                );
            }

            JsonNode root =
                    objectMapper.readTree(response);

            JsonNode candidates =
                    root.path("candidates");

            if (candidates.isMissingNode()
                    || candidates.isEmpty()) {

                throw new RuntimeException(
                        "No quiz generated by Gemini"
                );
            }

            String aiText =
                    candidates
                            .get(0)
                            .path("content")
                            .path("parts")
                            .get(0)
                            .path("text")
                            .asText();

            if (aiText == null
                    || aiText.isBlank()) {

                throw new RuntimeException(
                        "Gemini returned empty quiz content"
                );
            }

            // CLEAN RESPONSE

            aiText = aiText
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            JsonNode questionsNode =
                    objectMapper.readTree(aiText);

            if (!questionsNode.isArray()
                    || questionsNode.isEmpty()) {

                throw new RuntimeException(
                        "Invalid quiz format received from Gemini"
                );
            }

            Quiz quiz =
                    Quiz.builder()
                            .topic(
                                    request.getTopic()
                            )
                            .totalQuestions(
                                    request.getNumberOfQuestions()
                            )
                            .build();

            Quiz savedQuiz =
                    quizRepository.save(quiz);

            List<QuestionResponse>
                    questionResponses =
                    new ArrayList<>();

            for (JsonNode node :
                    questionsNode) {

                Question question =
                        Question.builder()

                                .question(
                                        node.path("question")
                                                .asText("")
                                )

                                .optionA(
                                        node.path("optionA")
                                                .asText("")
                                )

                                .optionB(
                                        node.path("optionB")
                                                .asText("")
                                )

                                .optionC(
                                        node.path("optionC")
                                                .asText("")
                                )

                                .optionD(
                                        node.path("optionD")
                                                .asText("")
                                )

                                .correctAnswer(
                                        node.path("correctAnswer")
                                                .asText("")
                                )

                                .quiz(savedQuiz)

                                .build();

                questionRepository.save(question);

                questionResponses.add(

                        QuestionResponse
                                .builder()

                                .questionId(
                                        question.getId()
                                )

                                .question(
                                        question.getQuestion()
                                )

                                .optionA(
                                        question.getOptionA()
                                )

                                .optionB(
                                        question.getOptionB()
                                )

                                .optionC(
                                        question.getOptionC()
                                )

                                .optionD(
                                        question.getOptionD()
                                )

                                .correctAnswer(
                                        question.getCorrectAnswer()
                                )

                                .build()
                );
            }

            return QuizResponse.builder()

                    .quizId(
                            savedQuiz.getId()
                    )

                    .topic(
                            savedQuiz.getTopic()
                    )

                    .totalQuestions(
                            savedQuiz.getTotalQuestions()
                    )

                    .questions(
                            questionResponses
                    )

                    .build();

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "Quiz generation failed: "
                            + e.getMessage()
            );
        }
    }

    @Override
    public QuizResultResponse submitQuiz(
            QuizSubmitRequest request
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                ));

        Quiz quiz =
                quizRepository
                        .findById(
                                request.getQuizId()
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Quiz not found"
                                ));

        List<Question> questions =
                questionRepository
                        .findByQuiz(quiz);

        int score = 0;

        for (QuizAnswerRequest answer :
                request.getAnswers()) {

            Question question =
                    questions.stream()

                            .filter(q ->
                                    q.getId().equals(
                                            answer.getQuestionId()
                                    )
                            )

                            .findFirst()

                            .orElse(null);

            if (question != null
                    && question.getCorrectAnswer()
                    .equalsIgnoreCase(
                            answer.getSelectedAnswer()
                    )) {

                score++;
            }
        }

        int earnedXp = score * 10;

        user.setXp(
                user.getXp() + earnedXp
        );

        user.setWeeklyXp(
                user.getWeeklyXp() + earnedXp
        );

        user.setLevel(
                (user.getXp() / 100) + 1
        );

        userRepository.save(user);

        QuizAttempt attempt =
                QuizAttempt.builder()

                        .quiz(quiz)

                        .user(user)

                        .score(score)

                        .totalQuestions(
                                questions.size()
                        )

                        .build();

        quizAttemptRepository
                .save(attempt);

        return QuizResultResponse
                .builder()

                .score(score)

                .totalQuestions(
                        questions.size()
                )

                .earnedXp(earnedXp)

                .currentXp(
                        user.getXp()
                )

                .currentLevel(
                        user.getLevel()
                )

                .build();
    }
}