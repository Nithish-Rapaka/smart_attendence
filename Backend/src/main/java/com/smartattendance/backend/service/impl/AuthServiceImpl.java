package com.smartattendance.backend.service.impl;

import com.smartattendance.backend.dto.request.LoginRequest;
import com.smartattendance.backend.dto.request.RegisterRequest;
import com.smartattendance.backend.dto.response.LoginResponse;
import com.smartattendance.backend.entity.User;
import com.smartattendance.backend.enums.Role;
import com.smartattendance.backend.repository.UserRepository;
import com.smartattendance.backend.security.JwtService;
import com.smartattendance.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() == null ? Role.TEACHER : request.getRole())
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        System.out.println("LOGIN API CALLED");
        System.out.println(request.getEmail());

        System.out.println("Before authenticate");

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        System.out.println("After authenticate");

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User Not Found"));
        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .roles(user.getRole().name())
                        .build();
        String token = jwtService.generateToken(userDetails);
        return LoginResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .message("Login Successful")
                .build();
    }
}