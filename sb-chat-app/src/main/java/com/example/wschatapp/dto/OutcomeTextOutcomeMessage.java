package com.example.wschatapp.dto;

import lombok.Getter;
import lombok.ToString;

import java.time.ZonedDateTime;

@Getter
@ToString
public class OutcomeTextOutcomeMessage extends BaseOutcomeMessage {

    private final String text;

    public OutcomeTextOutcomeMessage(MessageType type, String username, ZonedDateTime timestamp, String text) {
        super(type, username, timestamp);
        this.text = text;
    }

}