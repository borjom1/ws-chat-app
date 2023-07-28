package com.example.wschatapp.service.impl;

import com.example.wschatapp.dto.UserDto;
import com.example.wschatapp.dto.UserLoginDto;
import com.example.wschatapp.dto.UserRegistrationDto;
import com.example.wschatapp.entity.UserEntity;
import com.example.wschatapp.entity.UserRoles;
import com.example.wschatapp.exception.UserNotFoundException;
import com.example.wschatapp.repository.UserRepository;
import com.example.wschatapp.security.JwtProvider;
import com.example.wschatapp.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ModelMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    private final UserRepository userRepository;

    @Override
    public UserDto register(UserRegistrationDto dto) {
        log.info("-> register()");

        boolean isLoginUsed = userRepository.findUserEntityByLogin(dto.getLogin()).isPresent();
        if (isLoginUsed) {
            throw new BadCredentialsException("Login already in use");
        }

        UserEntity user = UserEntity.builder()
                .login(dto.getLogin())
                .password(passwordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .build();

        user.getRoles().add(UserRoles.ROLE_USER);
        userRepository.save(user);

        return buildUserDto(user);
    }

    @Override
    public UserDto login(UserLoginDto dto) {
        log.info("-> login()");

        UserEntity user = userRepository.findUserEntityByLogin(dto.getLogin())
                .orElseThrow(() -> new BadCredentialsException("Incorrect credentials"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Incorrect credentials");
        }

        return buildUserDto(user);
    }

    private UserEntity find(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User[%s] not found".formatted(id)));
    }

    private UserDto buildUserDto(UserEntity user) {
        UserDto userDto = mapper.map(user, UserDto.class);
        String accessToken = jwtProvider.generate(user.getId(), user.getLogin());
        userDto.setAccess(accessToken);
        return userDto;
    }

}