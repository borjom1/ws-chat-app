package com.example.wschatapp.service;

import com.example.wschatapp.dto.UserDto;
import com.example.wschatapp.dto.UserLoginDto;
import com.example.wschatapp.dto.UserRegistrationDto;

public interface UserService {
    UserDto register(UserRegistrationDto dto);
    UserDto login(UserLoginDto dto);
}