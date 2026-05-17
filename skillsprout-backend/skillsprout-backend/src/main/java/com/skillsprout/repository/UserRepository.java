package com.skillsprout.repository;

import com.skillsprout.entity.User;
import com.skillsprout.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findTop10ByOrderByXpDesc();

    List<User> findTop10ByOrderByWeeklyXpDesc();

    List<User> findTop10ByRoleOrderByXpDesc(
            Role role
    );

    List<User> findTop10ByRoleOrderByWeeklyXpDesc(
            Role role
    );
}