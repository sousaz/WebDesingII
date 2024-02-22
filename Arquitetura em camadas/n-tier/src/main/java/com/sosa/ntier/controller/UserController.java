package com.sosa.ntier.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sosa.ntier.service.UserService;

import com.sosa.ntier.model.User;

@RestController
@RequestMapping("/user")
public class UserController {

    public final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }
    
    @GetMapping
    public List<User> findAll(){
        return userService.findAll();
    }

}
