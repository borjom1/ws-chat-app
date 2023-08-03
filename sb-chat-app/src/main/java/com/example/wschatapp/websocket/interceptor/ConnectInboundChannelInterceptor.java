package com.example.wschatapp.websocket.interceptor;

import com.example.wschatapp.dto.MessageType;
import com.example.wschatapp.dto.OutcomeTextMessage;
import com.example.wschatapp.entity.UserEntity;
import com.example.wschatapp.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.lang.NonNull;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

import java.util.Objects;

import static java.time.ZonedDateTime.now;
import static java.util.Optional.ofNullable;
import static org.springframework.messaging.simp.stomp.StompCommand.CONNECT;

@Slf4j
@Component
public class ConnectInboundChannelInterceptor implements ChannelInterceptor {

    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;

    @Autowired
    public ConnectInboundChannelInterceptor(@Lazy SimpMessagingTemplate messagingTemplate, UserService userService) {
        this.messagingTemplate = messagingTemplate;
        this.userService = userService;
    }

    @Override
    public Message<?> preSend(@NonNull Message<?> message, @NonNull MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor == null) {
            return message;
        }

        log.info("command: {} | destination: {}", accessor.getCommand(), accessor.getDestination());

        if (Objects.equals(accessor.getCommand(), CONNECT)) {
            ofNullable(accessor.getNativeHeader("id"))
                    .map(list -> list.get(0))
                    .ifPresent(userIdHeader -> {
                        UserEntity user = userService.find(userIdHeader);
                        var payload = new OutcomeTextMessage(
                                MessageType.CONNECT,
                                user.getId(),
                                user.getLogin(),
                                now(),
                                "Just connected"
                        );
                        messagingTemplate.convertAndSend("/topic/connected", payload);
                    });
        }

        return message;
    }

}