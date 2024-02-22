package com.sosa.ntier.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sosa.ntier.model.User;
import com.sosa.ntier.repository.UserRepository;

@Service
public class UserService {
    public final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }
}
