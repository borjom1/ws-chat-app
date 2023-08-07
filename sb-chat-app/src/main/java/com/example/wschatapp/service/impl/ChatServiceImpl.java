package com.example.wschatapp.service.impl;

import com.example.wschatapp.dto.ChatDto;
import com.example.wschatapp.dto.IncomeTextMessage;
import com.example.wschatapp.dto.MessageType;
import com.example.wschatapp.dto.OutcomeTextMessage;
import com.example.wschatapp.entity.ChatEntity;
import com.example.wschatapp.entity.MessageEntity;
import com.example.wschatapp.entity.UserEntity;
import com.example.wschatapp.repository.ChatRepository;
import com.example.wschatapp.service.ChatService;
import com.example.wschatapp.service.MessageService;
import com.example.wschatapp.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import static com.example.wschatapp.entity.ChatType.DUO;
import static com.example.wschatapp.entity.ChatType.GROUP;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final UserService userService;
    private final MessageService messageService;
    private final ChatRepository chatRepository;

    @Override
    @Transactional
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
                    .type(DUO)
                    .membersLimit(2L)
                    .build();

            // add users to recently created chat
            newChat.addUser(sender);
            newChat.addUser(receiver);
            userService.save(sender, receiver);

            return chatRepository.save(newChat);
        });

        // persist received message into chat
        var persistedMessage = messageService.persist(incomeMessage, duoChat, sender);
        chatRepository.save(duoChat);
        return persistedMessage;
    }

    @Override
    public List<ChatDto> getAllDuoChats(String userId) {
        log.info("-> getAllDuoChats()");

        UserEntity user = userService.find(userId);
        return user.getChats().stream()
                .filter(chat -> chat.getType().equals(DUO))
                .map(chat -> {

                    // in this case we need to return duo-chat member regardless of that who sent message
                    MessageEntity lastMessage = messageService.getLastMessage(chat).orElseThrow();
                    UserEntity member = getDuoChatMember(chat, userId);

                    return new ChatDto(
                            member.getName(),
                            new OutcomeTextMessage(
                                    MessageType.MESSAGE,
                                    member.getId(),
                                    member.getLogin(),
                                    lastMessage.getCreated().atZone(ZoneId.systemDefault()),
                                    lastMessage.getText()
                            )
                    );
                })
                .sorted((chat1, chat2) ->
                        chat2.lastMessage().getTimestamp()
                        .compareTo(chat1.lastMessage().getTimestamp()))
                .toList();
    }

    private UserEntity getDuoChatMember(ChatEntity chat, String userId) {

        if (chat.getType().equals(GROUP)) {
            throw new IllegalArgumentException("accepted chat is not duo");
        }

        List<UserEntity> members = chat.getMembers();
        return members.get(0).getId().equals(userId) ?
                members.get(1) : members.get(0);
    }
}