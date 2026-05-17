package com.skillsprout.service;

public interface EmailService {

    void sendEmail(
            String to,
            String subject,
            String body
    );

    void sendWelcomeEmail(
            String to,
            String name
    );

    void sendEnrollmentEmail(
            String to,
            String courseName
    );

    void sendPasswordResetEmail(
            String to,
            String resetLink
    );
}