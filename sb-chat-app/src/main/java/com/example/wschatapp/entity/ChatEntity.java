package com.example.wschatapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "chats")
@AllArgsConstructor
@Data
@Builder
public class ChatEntity {

    @Id
    private String id;

    private String name;
    private String avatar;

    private boolean isPrivate;

    @Builder.Default
    private LocalDateTime created = LocalDateTime.now();

    private ChatType type;
    private long membersLimit;

    @DocumentReference(lazy = true)
    @Builder.Default
    private List<UserEntity> members = new ArrayList<>();

    @DocumentReference(lazy = true)
    @Builder.Default
    private List<MessageEntity> messages = new ArrayList<>();

    public void addUser(UserEntity user) {
        members.add(user);
        user.getChats().add(this);
    }

    public void addMessage(MessageEntity message) {
        messages.add(message);
        message.setChat(this);
    }

}