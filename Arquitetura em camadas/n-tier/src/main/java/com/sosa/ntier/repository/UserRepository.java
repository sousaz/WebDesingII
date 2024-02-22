package com.sosa.ntier.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sosa.ntier.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
}
