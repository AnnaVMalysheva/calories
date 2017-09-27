package com.example.calories.calories_backend.repositories;

import com.example.calories.calories_backend.entities.AppUser;
import com.example.calories.calories_backend.entities.AppUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends CrudRepository<AppUser, Integer> {
    Optional<AppUser> findOneByUsername(String username);

    @Override
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
    List<AppUser> findAll();

    @Override
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    AppUser save(AppUser appUser);
}
