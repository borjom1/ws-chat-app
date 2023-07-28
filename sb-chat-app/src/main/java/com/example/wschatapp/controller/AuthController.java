package com.example.wschatapp.controller;

import com.example.wschatapp.dto.UserDto;
import com.example.wschatapp.dto.UserLoginDto;
import com.example.wschatapp.dto.UserRegistrationDto;
import com.example.wschatapp.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(OK)
    public UserDto register(@Valid @RequestBody UserRegistrationDto dto) {
        return userService.register(dto);
    }

    @PostMapping("/login")
    @ResponseStatus(OK)
    public UserDto login(@Valid @RequestBody UserLoginDto dto) {
        return userService.login(dto);
    }

}