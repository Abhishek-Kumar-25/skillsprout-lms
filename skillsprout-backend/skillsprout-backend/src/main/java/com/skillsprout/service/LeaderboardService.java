package com.skillsprout.service;

import com.skillsprout.dto.LeaderboardResponse;

import java.util.List;

public interface LeaderboardService {

    List<LeaderboardResponse>
    getOverallLeaderboard();

    List<LeaderboardResponse>
    getWeeklyLeaderboard();

}