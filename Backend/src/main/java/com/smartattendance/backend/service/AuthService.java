package com.smartattendance.backend.service;

import com.smartattendance.backend.dto.request.LoginRequest;
import com.smartattendance.backend.dto.request.RegisterRequest;
import com.smartattendance.backend.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
    String register(RegisterRequest request);
}