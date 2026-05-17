package com.skillsprout.controller;

import com.skillsprout.dto.LeaderboardResponse;
import com.skillsprout.service.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @GetMapping("/leaderboard")
    public ResponseEntity<
            List<LeaderboardResponse>>
    overallLeaderboard() {

        return ResponseEntity.ok(
                leaderboardService
                        .getOverallLeaderboard()
        );
    }

    @GetMapping("/leaderboard/weekly")
    public ResponseEntity<
            List<LeaderboardResponse>>
    weeklyLeaderboard() {

        return ResponseEntity.ok(
                leaderboardService
                        .getWeeklyLeaderboard()
        );
    }

}