package com.skillsprout.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaderboardResponse {

    private Integer rank;

    private String name;

    private Integer xp;

    private Integer level;

}