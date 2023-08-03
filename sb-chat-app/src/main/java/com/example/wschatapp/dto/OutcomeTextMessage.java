package com.example.wschatapp.dto;

import lombok.Getter;
import lombok.ToString;

import java.time.ZonedDateTime;

@Getter
@ToString
public class OutcomeTextMessage extends BaseOutcomeMessage {

    private final String text;
    private final String senderLogin;

    public OutcomeTextMessage(MessageType type, String senderId, String senderLogin,
                              ZonedDateTime timestamp, String text) {
        super(type, senderId, timestamp);
        this.senderLogin = senderLogin;
        this.text = text;
    }

}