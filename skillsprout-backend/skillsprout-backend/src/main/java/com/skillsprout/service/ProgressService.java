package com.skillsprout.service;

import com.skillsprout.dto.ProgressResponse;

import java.util.List;

public interface ProgressService {

    ProgressResponse updateProgress(
            Long enrollmentId,
            Integer progress
    );

    List<ProgressResponse> getMyProgress();

}