package com.skillsprout.service.impl;

import com.skillsprout.dto.AuthResponse;
import com.skillsprout.dto.LoginRequest;
import com.skillsprout.dto.RegisterRequest;

import com.skillsprout.entity.User;

import com.skillsprout.enums.AuthProvider;
import com.skillsprout.enums.Role;

import com.skillsprout.exception.ResourceAlreadyExistsException;

import com.skillsprout.repository.UserRepository;

import com.skillsprout.security.JwtService;

import com.skillsprout.service.AuthService;
import com.skillsprout.service.EmailService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class AuthServiceImpl
        implements AuthService {

    private final UserRepository
            userRepository;

    private final PasswordEncoder
            passwordEncoder;

    private final JwtService
            jwtService;

    private final AuthenticationManager
            authenticationManager;

    private final EmailService
            emailService;

    // =========================
    // REGISTER
    // =========================

    @Override
    public AuthResponse register(
            RegisterRequest request
    ) {

        // CHECK EMAIL

        if (
                userRepository.existsByEmail(
                        request.getEmail()
                )
        ) {

            throw new ResourceAlreadyExistsException(
                    "Email already exists"
            );
        }

        // CREATE USER

        User user = User.builder()

                .name(
                        request.getName()
                )

                .email(
                        request.getEmail()
                )

                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )

                .role(
                        Role.ROLE_USER
                )

                .provider(
                        AuthProvider.LOCAL
                )

                .build();

        // SAVE USER

        userRepository.save(user);

        // SEND WELCOME EMAIL

        emailService.sendWelcomeEmail(

                user.getEmail(),

                user.getName()
        );

        // CREATE USER DETAILS

        UserDetails userDetails =
                new org.springframework.security.core.userdetails.User(

                        user.getEmail(),

                        user.getPassword(),

                        List.of(

                                new SimpleGrantedAuthority(
                                        user.getRole().name()
                                )
                        )
                );

        // GENERATE JWT

        String jwtToken =
                jwtService.generateToken(
                        userDetails
                );

        // RETURN RESPONSE

        return AuthResponse.builder()

                .token(jwtToken)

                .role(
                        user.getRole().name()
                )

                .name(
                        user.getName()
                )

                .email(
                        user.getEmail()
                )

                .build();
    }

    // =========================
    // LOGIN
    // =========================

    @Override
    public AuthResponse login(
            LoginRequest request
    ) {

        // AUTHENTICATE USER

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        request.getEmail(),

                        request.getPassword()
                )
        );

        // GET USER

        User user =
                userRepository.findByEmail(

                        request.getEmail()

                ).orElseThrow();

        // USER DETAILS

        UserDetails userDetails =
                new org.springframework.security.core.userdetails.User(

                        user.getEmail(),

                        user.getPassword(),

                        List.of(

                                new SimpleGrantedAuthority(
                                        user.getRole().name()
                                )
                        )
                );

        // GENERATE JWT

        String jwtToken =
                jwtService.generateToken(
                        userDetails
                );

        // RETURN RESPONSE

        return AuthResponse.builder()

                .token(jwtToken)

                .role(
                        user.getRole().name()
                )

                .name(
                        user.getName()
                )

                .email(
                        user.getEmail()
                )

                .build();
    }
}