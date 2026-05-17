package com.skillsprout.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/instructor")
public class InstructorController {

    @GetMapping("/test")
    public String instructorAccess() {
        return "Welcome Instructor!";
    }
}
