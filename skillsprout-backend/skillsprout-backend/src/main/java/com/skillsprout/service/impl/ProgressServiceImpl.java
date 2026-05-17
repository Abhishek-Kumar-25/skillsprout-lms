package com.skillsprout.service.impl;

import com.skillsprout.dto.ProgressResponse;
import com.skillsprout.entity.Enrollment;
import com.skillsprout.entity.User;
import com.skillsprout.enums.EnrollmentStatus;
import com.skillsprout.exception.ResourceNotFoundException;
import com.skillsprout.exception.UnauthorizedActionException;
import com.skillsprout.repository.EnrollmentRepository;
import com.skillsprout.repository.UserRepository;
import com.skillsprout.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgressServiceImpl
        implements ProgressService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;

    @Override
    public ProgressResponse updateProgress(
            Long enrollmentId,
            Integer progress
    ) {

        User user = getLoggedInUser();

        Enrollment enrollment =
                enrollmentRepository
                        .findById(enrollmentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Enrollment not found"
                                ));

        // Ownership check
        System.out.println(
                "Logged User ID = " + user.getId()
        );

        System.out.println(
                "Enrollment User ID = " +
                        enrollment.getUser().getId()
        );
        if (!enrollment.getUser()
                .getId()
                .equals(user.getId())) {

            throw new UnauthorizedActionException(
                    "You are not allowed to update this enrollment"
            );
        }

        // Progress validation
        if(progress < 0 || progress > 100){

            throw new IllegalArgumentException(
                    "Progress must be between 0 and 100"
            );
        }

        enrollment.setProgress(progress);

        int currentMilestone =
                (progress / 25) * 25;

        // Prevent null issue
        Integer lastMilestone =
                enrollment.getLastMilestoneAwarded();

        if(lastMilestone == null){
            lastMilestone = 0;
        }

        if(currentMilestone > lastMilestone){

            addXP(
                    user,
                    currentMilestone
            );

            enrollment.setLastMilestoneAwarded(
                    currentMilestone
            );
        }

        if(progress >= 100){

            enrollment.setStatus(
                    EnrollmentStatus.COMPLETED
            );
        }

        enrollmentRepository.save(
                enrollment
        );

        return ProgressResponse.builder()
                .enrollmentId(
                        enrollment.getId()
                )
                .courseTitle(
                        enrollment.getCourse()
                                .getTitle()
                )
                .progress(
                        enrollment.getProgress()
                )
                .xp(
                        user.getXp()
                )
                .level(
                        user.getLevel()
                )
                .status(
                        enrollment.getStatus()
                                .name()
                )
                .build();
    }

    @Override
    public List<ProgressResponse>
    getMyProgress() {

        User user = getLoggedInUser();

        return enrollmentRepository
                .findByUser(user)
                .stream()
                .map(enrollment ->

                        ProgressResponse.builder()
                                .enrollmentId(
                                        enrollment.getId()
                                )
                                .courseTitle(
                                        enrollment.getCourse()
                                                .getTitle()
                                )
                                .progress(
                                        enrollment.getProgress()
                                )
                                .xp(
                                        user.getXp()
                                )
                                .level(
                                        user.getLevel()
                                )
                                .status(
                                        enrollment.getStatus()
                                                .name()
                                )
                                .build()

                )
                .toList();
    }

    private void addXP(
            User user,
            int milestone
    ){

        int earnedXP = 0;

        switch (milestone){

            case 25 -> earnedXP = 20;

            case 50 -> earnedXP = 20;

            case 75 -> earnedXP = 20;

            case 100 -> earnedXP = 50;
        }

        user.setXp(
                user.getXp() + earnedXP
        );

        user.setWeeklyXp(
                user.getWeeklyXp() + earnedXP
        );

        user.setLevel(
                (user.getXp() / 100) + 1
        );

        userRepository.save(user);
    }

    private User getLoggedInUser(){

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));
    }
}