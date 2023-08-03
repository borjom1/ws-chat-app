package com.example.wschatapp.repository;

import com.example.wschatapp.entity.ChatEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRepository extends MongoRepository<ChatEntity, String> {
    @Query("{members: { $all: [new ObjectId('?0'), new ObjectId('?1')] }}")
    Optional<ChatEntity> findDuoChatByMembers(String memberId1, String memberId2);
}