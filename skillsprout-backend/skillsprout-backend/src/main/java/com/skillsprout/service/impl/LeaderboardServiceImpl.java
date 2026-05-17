package com.skillsprout.service.impl;

import com.skillsprout.dto.LeaderboardResponse;
import com.skillsprout.entity.User;
import com.skillsprout.enums.Role;
import com.skillsprout.repository.UserRepository;
import com.skillsprout.service.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class LeaderboardServiceImpl
        implements LeaderboardService {

    private final UserRepository userRepository;

    @Override
    public List<LeaderboardResponse>
    getOverallLeaderboard() {

        List<User> users =
                userRepository
                        .findTop10ByRoleOrderByXpDesc(
                                Role.ROLE_USER
                        );

        AtomicInteger rank =
                new AtomicInteger(1);

        return users.stream()
                .map(user ->
                        LeaderboardResponse.builder()
                                .rank(
                                        rank.getAndIncrement()
                                )
                                .name(
                                        user.getName()
                                )
                                .xp(
                                        user.getXp()
                                )
                                .level(
                                        user.getLevel()
                                )
                                .build()
                )
                .toList();
    }

    @Override
    public List<LeaderboardResponse>
    getWeeklyLeaderboard() {

        List<User> users =
                userRepository
                        .findTop10ByRoleOrderByWeeklyXpDesc(
                                Role.ROLE_USER
                        );

        AtomicInteger rank =
                new AtomicInteger(1);

        return users.stream()
                .map(user ->
                        LeaderboardResponse.builder()
                                .rank(
                                        rank.getAndIncrement()
                                )
                                .name(
                                        user.getName()
                                )
                                .xp(
                                        user.getWeeklyXp()
                                )
                                .level(
                                        user.getLevel()
                                )
                                .build()
                )
                .toList();
    }
}