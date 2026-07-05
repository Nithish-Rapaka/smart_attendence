package com.smartattendance.backend.controller;

import com.smartattendance.backend.dto.request.LoginRequest;
import com.smartattendance.backend.dto.request.RegisterRequest;
import com.smartattendance.backend.dto.response.LoginResponse;
import com.smartattendance.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;
    @GetMapping("/test")
    public String test() {
        return "Backend is working!";
    }
    @PostMapping("/test-post")
    public String testPost() {
        return "POST Working";
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request) {

        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(authService.login(request));
    }

}