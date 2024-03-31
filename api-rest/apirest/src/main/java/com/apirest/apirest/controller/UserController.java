package com.apirest.apirest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RestController;

import com.apirest.apirest.domain.user.User;
import com.apirest.apirest.repository.userRepository.UserRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;


@RestController
@RequestMapping("/user")
public class UserController {
    @GetMapping
    @Operation(description = "Retorna 'sucess' caso tenha um token valido")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Retorna a string 'Sucess'"),
        @ApiResponse(responseCode = "403", description = "Acesso negado a essa rota")
    })
    public ResponseEntity<String> listUsers() {
        return ResponseEntity.ok("Sucess");
    }
    
}
