package com.example.wschatapp.service;

import com.example.wschatapp.dto.ChatDto;
import com.example.wschatapp.dto.IncomeTextMessage;
import com.example.wschatapp.dto.OutcomeTextMessage;

import java.util.List;

public interface ChatService {
    OutcomeTextMessage saveMessage(IncomeTextMessage incomeMessage);
    List<ChatDto> getAllDuoChats(String id);
}