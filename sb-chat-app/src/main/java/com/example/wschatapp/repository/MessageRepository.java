package com.example.wschatapp.repository;

import com.example.wschatapp.entity.MessageEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends MongoRepository<MessageEntity, String> {
}