package com.apirest.apirest.repository.userRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apirest.apirest.domain.user.User;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
}
