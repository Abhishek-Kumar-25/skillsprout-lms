package com.skillsprout.repository;

import com.skillsprout.entity.Question;
import com.skillsprout.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository
        extends JpaRepository<Question, Long> {

    List<Question> findByQuiz(
            Quiz quiz
    );
}