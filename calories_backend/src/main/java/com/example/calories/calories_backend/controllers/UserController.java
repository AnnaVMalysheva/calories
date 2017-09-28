package com.example.calories.calories_backend.controllers;

import com.example.calories.calories_backend.entities.AppUser;
import com.example.calories.calories_backend.repositories.UserRepository;
import com.example.calories.calories_backend.security.JWTUser;
import com.example.calories.calories_backend.security.JwtTokenUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Map<String,Object> signUp(@RequestBody AppUser appUser) {
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
        Map<String,Object> result = new HashMap<>();
        List<String> authorizations = new ArrayList<>();

        for (GrantedAuthority grantedAuthority : authentication.getAuthorities()) {
            authorizations.add(grantedAuthority.getAuthority());
        }
        result.put("permissions", authorizations);
        result.put("userName", ((JWTUser) authentication.getPrincipal()).getUsername());
        result.put("token", jwtTokenUtil.generateToken(authentication));
        return result;
    }

    @GetMapping(value = "/user")
    public Map<String,Object>  user(@AuthenticationPrincipal Principal principal) {
        Map<String,Object> result = new HashMap<>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        SecurityContextHolder.getContext().setAuthentication(auth);
        List<String> authorizations = new ArrayList<>();

        for (GrantedAuthority grantedAuthority : auth.getAuthorities()) {
            authorizations.add(grantedAuthority.getAuthority());
        }
        result.put("permissions", authorizations);
        result.put("userName", ((JWTUser) auth.getPrincipal()).getUsername());
        result.put("token", jwtTokenUtil.generateToken(auth));
        return result;
    }
}