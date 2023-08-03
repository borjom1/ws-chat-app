package com.example.wschatapp.service;

import com.example.wschatapp.dto.IncomeTextMessage;
import com.example.wschatapp.dto.OutcomeTextMessage;

public interface ChatService {
    OutcomeTextMessage saveMessage(IncomeTextMessage incomeMessage);
}