package com.example.wschatapp.websocket;

import com.example.wschatapp.websocket.interceptor.ConnectInboundChannelInterceptor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompReactorNettyCodec;
import org.springframework.messaging.tcp.reactor.ReactorNettyTcpClient;
import org.springframework.web.socket.config.annotation.*;

@Slf4j
@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${spring.rabbitmq.username}")
    private String RABBITMQ_USERNAME;

    @Value("${spring.rabbitmq.password}")
    private String RABBITMQ_PASSWORD;

    @Value("${spring.rabbitmq.stomp.port}")
    private int RABBITMQ_STOMP_PORT;

    private final ConnectInboundChannelInterceptor connectInterceptor;

    @Override
    public void registerStompEndpoints(@NonNull StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(@NonNull MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableStompBrokerRelay("/topic/connected", "/queue")
                .setClientLogin(RABBITMQ_USERNAME)
                .setClientPasscode(RABBITMQ_PASSWORD)
                .setRelayPort(RABBITMQ_STOMP_PORT)
                .setTcpClient(createTcpClient());
    }

    @Override
    public void configureClientInboundChannel(@NonNull ChannelRegistration registration) {
        registration.interceptors(connectInterceptor);
    }

    private ReactorNettyTcpClient<byte[]> createTcpClient() {
        return new ReactorNettyTcpClient<>(
                tcpClient -> tcpClient.port(RABBITMQ_STOMP_PORT),
                new StompReactorNettyCodec()
        );
    }

}