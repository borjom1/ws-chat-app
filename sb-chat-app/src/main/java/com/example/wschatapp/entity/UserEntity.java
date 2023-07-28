package com.example.wschatapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@AllArgsConstructor
@Data
@Builder
public class UserEntity {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String login;

    private String password;

    @Builder.Default
    private LocalDateTime created = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime lastSeen = LocalDateTime.now();

    @Builder.Default
    private List<UserRoles> roles = new ArrayList<>();

}