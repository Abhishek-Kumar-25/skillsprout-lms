package com.skillsprout.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "courses")

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

@Builder

public class Course {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String category;

    private String difficulty;

    private String thumbnailUrl;

    @Column(length = 1000)
    private String videoUrl;

    // COURSE CREATOR

    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "created_by")

    @JsonIgnore

    private User createdBy;

    // CREATED TIME

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {

        createdAt =
                LocalDateTime.now();
    }
}