package com.smartattendance.backend.service;

import com.smartattendance.backend.dto.request.ChangePasswordRequest;
import com.smartattendance.backend.dto.request.UpdateEmailRequest;

public interface ProfileService {

    void updateEmail(UpdateEmailRequest request);

    void changePassword(ChangePasswordRequest request);

}