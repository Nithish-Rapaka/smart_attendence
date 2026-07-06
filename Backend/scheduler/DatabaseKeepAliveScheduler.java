package com.smartattendance.backend.scheduler;

import com.smartattendance.backend.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DatabaseKeepAliveScheduler {

    private final UserRepository userRepository;

    public DatabaseKeepAliveScheduler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Scheduled(fixedRate = 300000) // Every 5 minutes
    public void keepDatabaseAlive() {
        long totalUsers = userRepository.count();
        System.out.println("Neon DB Keep Alive - Total Users: " + totalUsers);
    }
}