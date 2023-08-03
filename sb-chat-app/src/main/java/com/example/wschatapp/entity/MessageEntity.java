package com.example.wschatapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;

@Document(collection = "messages")
@AllArgsConstructor
@Data
@Builder
public class MessageEntity {

    @Id
    private String id;

    @DocumentReference(lazy = true)
    private ChatEntity chat;

    @DocumentReference
    private UserEntity sender;

    private String text;
    private boolean isRead;

    @Builder.Default
    private LocalDateTime created = LocalDateTime.now();

}