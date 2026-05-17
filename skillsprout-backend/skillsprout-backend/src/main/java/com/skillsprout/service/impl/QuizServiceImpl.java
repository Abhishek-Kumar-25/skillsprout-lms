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

            String prompt =
                    """
                    Generate %d multiple choice questions on topic: %s
                    
                    Return ONLY valid JSON array.
                    
                    Correct answer should ONLY be:
                    A or B or C or D
                    
                    Format:
                    [
                      {
                        "question":"...",
                        "optionA":"...",
                        "optionB":"...",
                        "optionC":"...",
                        "optionD":"...",
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

            String aiText =
                    root.path("candidates")
                            .get(0)
                            .path("content")
                            .path("parts")
                            .get(0)
                            .path("text")
                            .asText();

            aiText = aiText
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            JsonNode questionsNode =
                    objectMapper.readTree(aiText);

            Quiz quiz = Quiz.builder()
                    .topic(request.getTopic())
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
                                        node.get("question")
                                                .asText()
                                )
                                .optionA(
                                        node.get("optionA")
                                                .asText()
                                )
                                .optionB(
                                        node.get("optionB")
                                                .asText()
                                )
                                .optionC(
                                        node.get("optionC")
                                                .asText()
                                )
                                .optionD(
                                        node.get("optionD")
                                                .asText()
                                )
                                .correctAnswer(
                                        node.get("correctAnswer")
                                                .asText()
                                )
                                .quiz(savedQuiz)
                                .build();

                questionRepository
                        .save(question);

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
                            savedQuiz
                                    .getTotalQuestions()
                    )
                    .questions(
                            questionResponses
                    )
                    .build();

        } catch (Exception e) {

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
                                            answer
                                                    .getQuestionId()
                                    )
                            )
                            .findFirst()
                            .orElse(null);

            if (question != null &&
                    question.getCorrectAnswer()
                            .equalsIgnoreCase(
                                    answer
                                            .getSelectedAnswer()
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