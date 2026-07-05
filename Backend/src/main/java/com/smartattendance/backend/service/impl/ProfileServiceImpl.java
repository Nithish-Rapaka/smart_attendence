package com.smartattendance.backend.service.impl;

import com.smartattendance.backend.dto.request.ChangePasswordRequest;
import com.smartattendance.backend.dto.request.UpdateEmailRequest;
import com.smartattendance.backend.entity.User;
import com.smartattendance.backend.repository.UserRepository;
import com.smartattendance.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void updateEmail(UpdateEmailRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEmail(request.getEmail());

        userRepository.save(user);
    }

    @Override
    public void changePassword(ChangePasswordRequest request) {
        System.out.println("========== CHANGE PASSWORD API CALLED ==========");
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current Password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }
}