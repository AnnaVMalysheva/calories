package com.example.calories.calories_backend;

import com.example.calories.calories_backend.entities.AppUser;
import com.example.calories.calories_backend.entities.Role;
import com.example.calories.calories_backend.repositories.RecordRepository;
import com.example.calories.calories_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RecordRepository recordRepository;

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    public DatabaseLoader(UserRepository userRepository, RecordRepository recordRepository) {
        this.userRepository = userRepository;
        this.recordRepository = recordRepository;
    }

    @Override
    public void run(String... strings) throws Exception {

        Optional<AppUser> user = Optional.of(AppUser.builder().username("Frodo").password("test").role(Role.ADMIN).dailyExpectation(10).build());
        userRepository.save(user.get());

//        user = userRepository.findOneByEmail("Frodo");
//
//        Record record = Record.builder().description("first record").caloricity(10).user(user.get()).createdDate(LocalDate.now()).build();
//        recordRepository.save(record);
//        record = Record.builder().description("second record").caloricity(2).user(user.get()).createdDate(LocalDate.now().minusDays(2)).build();
//        recordRepository.save(record);
//
//        user = Optional.of(User.builder().email("Frodo2").password("test").role(Role.MANAGER).dailyExpectation(10).build());
//        userRepository.save(user.get());
//
//        user = userRepository.findOneByEmail("Frodo2");
//        record = Record.builder().description("first record").caloricity(2).user(user.get()).createdDate(LocalDate.now().minusDays(2)).build();
//        recordRepository.save(record);
//
//        user = Optional.of(User.builder().email("Frodo3").password("test").role(Role.USER).dailyExpectation(10).build());
//        userRepository.save(user.get());
//
//        user = userRepository.findOneByEmail("Frodo3");
//        record = Record.builder().description("first record").caloricity(2).user(user.get()).createdDate(LocalDate.now().minusDays(2)).build();
//        recordRepository.save(record);

    }
}
