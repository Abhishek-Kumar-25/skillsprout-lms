package com.skillsprout.entity;

import jakarta.persistence.*;
import lombok.*;
import org.aspectj.weaver.patterns.TypePatternQuestions;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "quizzes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quiz {

    @Id
    @GeneratedValue(strategy =
            GenerationType.IDENTITY)
    private Long id;

    private String topic;

    private Integer totalQuestions;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(
            mappedBy = "quiz",
            cascade = CascadeType.ALL
    )
    private List<Question> questions;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist(){

        createdAt =
                LocalDateTime.now();
    }
}