package com.example.wschatapp.service;

import com.example.wschatapp.dto.IncomeTextMessage;
import com.example.wschatapp.dto.OutcomeTextMessage;
import com.example.wschatapp.entity.ChatEntity;
import com.example.wschatapp.entity.MessageEntity;
import com.example.wschatapp.entity.UserEntity;

import java.util.Optional;

public interface MessageService {
    OutcomeTextMessage persist(IncomeTextMessage message, ChatEntity chat, UserEntity sender);
    Optional<MessageEntity> getLastMessage(ChatEntity chat);
}