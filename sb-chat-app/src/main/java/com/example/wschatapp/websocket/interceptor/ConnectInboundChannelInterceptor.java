package com.example.wschatapp.websocket.interceptor;

import com.example.wschatapp.dto.BaseOutcomeMessage;
import com.example.wschatapp.dto.MessageType;
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

    @Autowired
    public ConnectInboundChannelInterceptor(@Lazy SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public Message<?> preSend(@NonNull Message<?> message, @NonNull MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor == null) {
            return message;
        }

        log.info("command: {} | destination: {}", accessor.getCommand(), accessor.getDestination());

        if (Objects.equals(accessor.getCommand(), CONNECT)) {
            ofNullable(accessor.getNativeHeader("username"))
                    .map(list -> list.get(0))
                    .ifPresent(usernameHeader -> {
                        var payload = new BaseOutcomeMessage(MessageType.CONNECT, usernameHeader, now());
                        messagingTemplate.convertAndSend("/topic/connected", payload);
                    });
        }

        return message;
    }

}