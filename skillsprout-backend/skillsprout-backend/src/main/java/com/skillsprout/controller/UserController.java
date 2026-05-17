package com.skillsprout.controller;

import com.skillsprout.dto.UserResponse;
import com.skillsprout.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.skillsprout.dto.ProfileResponse;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    public ResponseEntity<UserResponse> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse>
    getProfile() {

        return ResponseEntity.ok(
                userService.getProfile()
        );
    }
}
