package com.example.wschatapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.ZonedDateTime;

@AllArgsConstructor
@Getter
public class BaseOutcomeMessage {
    private final MessageType type;
    private final String username;
    private final ZonedDateTime timestamp;
}