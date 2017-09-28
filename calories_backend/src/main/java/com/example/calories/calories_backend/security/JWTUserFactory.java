package com.example.calories.calories_backend.security;

import com.example.calories.calories_backend.entities.AppUser;
import com.example.calories.calories_backend.entities.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import java.util.List;

public class JWTUserFactory {

    public static JWTUser create(AppUser user) {
        return new JWTUser(
                user.getId(),
                user.getUsername(),
                user.getPasswordHash(),
                mapToGrantedAuthorities(user.getRole())
        );
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(Enum<Role> authority) {
        if (authority != null) {
            return AuthorityUtils.createAuthorityList("ROLE_" + authority.toString());
        }
        return AuthorityUtils.createAuthorityList();
    }
}
