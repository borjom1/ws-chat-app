package com.example.wschatapp.security;

import com.example.wschatapp.entity.UserEntity;
import com.example.wschatapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DefaultUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity user = userRepository.findUserEntityByLogin(username)
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));

        return new DefaultUserDetails(user.getId(), user.getLogin(), user.getPassword(), user.getRoles());
    }

}