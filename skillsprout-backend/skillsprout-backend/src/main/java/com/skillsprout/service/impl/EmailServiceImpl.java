package com.skillsprout.service.impl;

import com.skillsprout.service.EmailService;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;

import org.springframework.mail.SimpleMailMessage;

import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j

public class EmailServiceImpl
        implements EmailService {

    private final JavaMailSender
            mailSender;

    @Override
    public void sendEmail(

            String to,

            String subject,

            String body
    ) {

        try {

            SimpleMailMessage message =
                    new SimpleMailMessage();

            // SENDER

            message.setFrom(
                    "yourgmail@gmail.com"
            );

            // RECEIVER

            message.setTo(to);

            // SUBJECT

            message.setSubject(subject);

            // BODY

            message.setText(body);

            // SEND MAIL

            mailSender.send(message);

            log.info(
                    "Email sent successfully to: {}",
                    to
            );

        } catch (Exception e) {

            log.error(
                    "Failed to send email: {}",
                    e.getMessage()
            );

            throw new RuntimeException(
                    "Unable to send email"
            );
        }
    }

    // =========================
    // WELCOME EMAIL
    // =========================

    public void sendWelcomeEmail(

            String to,

            String name
    ) {

        String subject =
                "Welcome to SkillSprout 🚀";

        String body =

                "Hello " + name + ",\n\n"

                        + "Welcome to SkillSprout LMS Platform 🎉\n\n"

                        + "Your account has been created successfully.\n\n"

                        + "Start learning and building your future today 🚀\n\n"

                        + "Regards,\n"

                        + "SkillSprout Team";

        sendEmail(
                to,
                subject,
                body
        );
    }

    // =========================
    // COURSE ENROLLMENT EMAIL
    // =========================

    public void sendEnrollmentEmail(

            String to,

            String courseName
    ) {

        String subject =
                "Course Enrollment Successful 📚";

        String body =

                "Congratulations 🎉\n\n"

                        + "You have successfully enrolled in:\n\n"

                        + courseName + "\n\n"

                        + "Happy Learning 🚀\n\n"

                        + "SkillSprout Team";

        sendEmail(
                to,
                subject,
                body
        );
    }

    // =========================
    // PASSWORD RESET EMAIL
    // =========================

    public void sendPasswordResetEmail(

            String to,

            String resetLink
    ) {

        String subject =
                "Reset Your Password 🔐";

        String body =

                "Hello,\n\n"

                        + "Click the link below to reset your password:\n\n"

                        + resetLink + "\n\n"

                        + "If you did not request this, please ignore this email.\n\n"

                        + "SkillSprout Team";

        sendEmail(
                to,
                subject,
                body
        );
    }
}