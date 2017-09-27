package com.example.calories.calories_backend.controllers;

import com.example.calories.calories_backend.entities.AppUser;
import com.example.calories.calories_backend.repositories.UserRepository;
import com.example.calories.calories_backend.security.JWTAuthenticationResponse;
import com.example.calories.calories_backend.security.JwtTokenUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenUtil jwtTokenUtil;


    public UserController(UserRepository userRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder, AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/sign-up")
    public JWTAuthenticationResponse signUp(@RequestBody AppUser appUser) {
        appUser.setPasswordHash(bCryptPasswordEncoder.encode(appUser.getPassword()));
        userRepository.save(appUser);
        // Perform the security
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        appUser.getUsername(),
                        appUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new JWTAuthenticationResponse(jwtTokenUtil.generateToken(authentication));
    }
}