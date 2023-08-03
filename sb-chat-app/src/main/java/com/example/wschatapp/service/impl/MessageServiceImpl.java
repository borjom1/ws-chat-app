package com.example.wschatapp.service.impl;

import com.example.wschatapp.dto.IncomeTextMessage;
import com.example.wschatapp.dto.MessageType;
import com.example.wschatapp.dto.OutcomeTextMessage;
import com.example.wschatapp.entity.ChatEntity;
import com.example.wschatapp.entity.MessageEntity;
import com.example.wschatapp.entity.UserEntity;
import com.example.wschatapp.repository.MessageRepository;
import com.example.wschatapp.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.ZoneId;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    @Override
    public OutcomeTextMessage persist(IncomeTextMessage message, ChatEntity chat, UserEntity sender) {
        MessageEntity newMessage = MessageEntity.builder()
                .sender(sender)
                .text(message.text())
                .build();

        chat.addMessage(newMessage);
        messageRepository.save(newMessage);

        return new OutcomeTextMessage(
                MessageType.MESSAGE,
                sender.getId(),
                sender.getLogin(),
                newMessage.getCreated().atZone(ZoneId.systemDefault()),
                newMessage.getText()
        );
    }

}