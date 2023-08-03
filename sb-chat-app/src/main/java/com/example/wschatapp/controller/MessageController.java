package com.example.wschatapp.controller;

import com.example.wschatapp.dto.IncomeTextMessage;
import com.example.wschatapp.dto.OutcomeTextMessage;
import com.example.wschatapp.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    @MessageMapping("/send.message")
    public void handleIncomeMessage(@Payload IncomeTextMessage message) {
        log.info("MSG={}", message);
        OutcomeTextMessage textMessage = chatService.saveMessage(message);
        messagingTemplate.convertAndSend("/queue/%s".formatted(message.receiverId()), textMessage);
    }

}