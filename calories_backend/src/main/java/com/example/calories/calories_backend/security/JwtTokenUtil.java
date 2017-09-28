package com.example.calories.calories_backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

import static com.example.calories.calories_backend.security.SecurityConstants.EXPIRATION_TIME;
import static com.example.calories.calories_backend.security.SecurityConstants.SECRET;

@Component
public class JwtTokenUtil {
    public String generateToken(Authentication auth) {
        return Jwts.builder()
                .setSubject(((JWTUser) auth.getPrincipal()).getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();

    }
}
