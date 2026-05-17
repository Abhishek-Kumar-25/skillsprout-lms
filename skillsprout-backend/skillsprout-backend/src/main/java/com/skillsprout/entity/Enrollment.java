package com.skillsprout.entity;

import com.skillsprout.enums.EnrollmentStatus;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

@Builder

public class Enrollment {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "user_id")

    private User user;

    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "course_id")

    private Course course;

    @Builder.Default
    private Integer progress = 0;

    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status;

    @Builder.Default
    @Column(nullable = false)
    private Integer lastMilestoneAwarded = 0;

    private LocalDateTime enrolledAt;

    @PrePersist
    public void prePersist() {

        enrolledAt =
                LocalDateTime.now();

        if (status == null) {

            status =
                    EnrollmentStatus.ACTIVE;
        }
    }
}