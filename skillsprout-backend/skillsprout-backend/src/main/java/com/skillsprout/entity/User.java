package com.skillsprout.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.skillsprout.enums.AuthProvider;
import com.skillsprout.enums.Role;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

@Builder

public class User {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(
            nullable = false,
            unique = true
    )
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @Builder.Default
    private Integer xp = 0;

    @Builder.Default
    private Integer level = 1;

    @Builder.Default
    private Integer levelUp = 1;

    @Builder.Default
    private Integer streak = 0;

    @Builder.Default
    @Column(nullable = false)
    private Integer weeklyXp = 0;

    private LocalDateTime createdAt;

    // =========================
    // USER ENROLLMENTS
    // =========================

    @OneToMany(

            mappedBy = "user",

            cascade = CascadeType.ALL,

            orphanRemoval = true
    )

    @JsonIgnore

    @Builder.Default
    private List<Enrollment> enrollments =
            new ArrayList<>();

    // =========================
    // USER COURSES
    // =========================

    @OneToMany(

            mappedBy = "createdBy",

            cascade = CascadeType.ALL,

            orphanRemoval = true
    )

    @JsonIgnore

    @Builder.Default
    private List<Course> courses =
            new ArrayList<>();

    @PrePersist
    public void prePersist() {

        createdAt =
                LocalDateTime.now();

        if (role == null) {

            role =
                    Role.ROLE_USER;
        }

        if (provider == null) {

            provider =
                    AuthProvider.LOCAL;
        }
    }
}