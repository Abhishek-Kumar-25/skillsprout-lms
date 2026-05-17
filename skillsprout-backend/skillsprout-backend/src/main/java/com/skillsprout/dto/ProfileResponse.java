package com.skillsprout.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponse {

    private String name;

    private String email;

    private Integer xp;

    private Integer level;

    private Integer streak;
}