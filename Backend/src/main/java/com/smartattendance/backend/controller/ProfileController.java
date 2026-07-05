package com.smartattendance.backend.controller;

import com.smartattendance.backend.dto.request.ChangePasswordRequest;
import com.smartattendance.backend.dto.request.UpdateEmailRequest;
import com.smartattendance.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PutMapping("/email")
    public ResponseEntity<String> updateEmail(
            @RequestBody UpdateEmailRequest request) {

        profileService.updateEmail(request);

        return ResponseEntity.ok("Email Updated Successfully");
    }

    @PutMapping("/password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request) {

        profileService.changePassword(request);

        return ResponseEntity.ok("Password Updated Successfully");
    }
}