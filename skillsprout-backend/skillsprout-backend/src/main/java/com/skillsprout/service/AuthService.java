package com.skillsprout.service;

import com.skillsprout.dto.AuthResponse;
import com.skillsprout.dto.LoginRequest;
import com.skillsprout.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
