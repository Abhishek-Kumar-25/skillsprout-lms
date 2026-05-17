package com.skillsprout.service;

import com.skillsprout.dto.LoginRequest;
import com.skillsprout.dto.ProfileResponse;
import com.skillsprout.dto.UserResponse;

public interface UserService {
    UserResponse getCurrentUser();
    ProfileResponse getProfile();
}
