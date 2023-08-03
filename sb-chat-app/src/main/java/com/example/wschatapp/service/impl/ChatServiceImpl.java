package com.example.wschatapp.service.impl;

import com.example.wschatapp.dto.IncomeTextMessage;
import com.example.wschatapp.dto.OutcomeTextMessage;
import com.example.wschatapp.entity.ChatEntity;
import com.example.wschatapp.entity.ChatType;
import com.example.wschatapp.entity.UserEntity;
import com.example.wschatapp.repository.ChatRepository;
import com.example.wschatapp.service.ChatService;
import com.example.wschatapp.service.MessageService;
import com.example.wschatapp.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final UserService userService;
    private final MessageService messageService;
    private final ChatRepository chatRepository;

    @Override
    public OutcomeTextMessage saveMessage(IncomeTextMessage incomeMessage) {
        log.info("-> saveMessage(): {}", incomeMessage);

        // check users
        UserEntity sender = userService.find(incomeMessage.senderId());
        UserEntity receiver = userService.find(incomeMessage.receiverId());

        // find or create chat
        Optional<ChatEntity> optDuoChat = chatRepository.findDuoChatByMembers(incomeMessage.senderId(), incomeMessage.receiverId());
        ChatEntity duoChat;

        duoChat = optDuoChat.orElseGet(() -> {
            ChatEntity newChat = ChatEntity.builder()
                    .members(List.of(sender, receiver))
                    .type(ChatType.DUO)
                    .membersLimit(2L)
                    .build();
            return chatRepository.save(newChat);
        });

        // persist received message into chat
        var persistedMessage = messageService.persist(incomeMessage, duoChat, sender);
        chatRepository.save(duoChat);
        return persistedMessage;
    }

}
