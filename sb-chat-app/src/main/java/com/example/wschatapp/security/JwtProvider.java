package com.example.wschatapp.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;

import static java.time.temporal.ChronoUnit.MINUTES;

@Component
public class JwtProvider {

    @Value("${jwt.issuer}")
    private String ISSUER;

    @Value("${jwt.subject}")
    private String SUBJECT;

    @Value("${jwt.secret-key}")
    private String SECRET_KEY;

    @Value("${jwt.expire-minutes}")
    private long EXPIRATION_IN_MINUTES;

    public boolean isValid(String token) {
        try {
            decode(token);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }

    public String generate(String userId, String login) {
        return JWT.create()
                .withIssuer(ISSUER)
                .withSubject(SUBJECT)
                .withClaim("userId", userId)
                .withClaim("login", login)
                .withExpiresAt(Instant.now().plus(EXPIRATION_IN_MINUTES, MINUTES))
                .sign(HMAC256());
    }

    public Map<String, Claim> getClaims(String token) {
        return decode(token).getClaims();
    }

    private Algorithm HMAC256() {
        return Algorithm.HMAC256(SECRET_KEY);
    }

    private DecodedJWT decode(String token) {
        return JWT.require(HMAC256())
                .withIssuer(ISSUER)
                .withSubject(SUBJECT)
                .build()
                .verify(token);
    }

}