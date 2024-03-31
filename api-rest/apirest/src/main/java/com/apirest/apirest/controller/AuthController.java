package com.apirest.apirest.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apirest.apirest.DTOs.LoginRequestDTO;
import com.apirest.apirest.DTOs.ResponseDTO;
import com.apirest.apirest.domain.user.User;
import com.apirest.apirest.repository.userRepository.UserRepository;
import com.apirest.apirest.security.TokenService;

import io.swagger.v3.oas.annotations.responses.ApiResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TokenService tokenService;

    @ApiResponse(responseCode = "200", description = "Login feito com sucesso")
    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequestDTO body) {
        User user = this.userRepository.findByUsername(body.username()).orElseThrow(() -> new RuntimeException("User not found"));
        if(passwordEncoder.matches(body.password(), user.getPassword())){
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getUsername(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @ApiResponse(responseCode = "200", description = "Registrado com sucesso")
    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody LoginRequestDTO body) {
        Optional<User> user = this.userRepository.findByUsername(body.username());
        if(user.isEmpty()){
            User newUser = new User();
            newUser.setUsername(body.username());
            newUser.setPassword(passwordEncoder.encode(body.password()));
            this.userRepository.save(newUser);

            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok(new ResponseDTO(newUser.getUsername(), token));
        }
        return ResponseEntity.badRequest().build();
    }
    
    
}
