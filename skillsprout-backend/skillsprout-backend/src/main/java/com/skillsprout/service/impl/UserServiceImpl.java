package com.skillsprout.service.impl;

import com.skillsprout.dto.UserResponse;
import com.skillsprout.entity.User;
import com.skillsprout.exception.ResourceNotFoundException;
import com.skillsprout.repository.UserRepository;
import com.skillsprout.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.skillsprout.dto.ProfileResponse;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserResponse getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .xp(user.getXp())
                .level(user.getLevel())
                .streak(user.getStreak())
                .build();
    }
    @Override
    public ProfileResponse getProfile() {

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

        return ProfileResponse.builder()

                .name(user.getName())

                .email(user.getEmail())

                .xp(user.getXp())

                .level(user.getLevel())

                .streak(user.getStreak())

                .build();
    }
}
