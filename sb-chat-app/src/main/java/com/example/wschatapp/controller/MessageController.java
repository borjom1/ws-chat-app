package com.example.wschatapp.controller;

import com.example.wschatapp.dto.IncomeTextMessage;
import com.example.wschatapp.dto.OutcomeTextOutcomeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import static com.example.wschatapp.dto.MessageType.MESSAGE;
import static java.time.ZonedDateTime.now;

@Slf4j
@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/send.message")
    public void handleMessage(@Payload IncomeTextMessage message) {
        log.info("MSG={}", message);

        var outcomeMsg = new OutcomeTextOutcomeMessage(MESSAGE, message.sender(), now(), message.text());
        messagingTemplate.convertAndSend("/queue/%s".formatted(message.receiver()), outcomeMsg);
    }

}