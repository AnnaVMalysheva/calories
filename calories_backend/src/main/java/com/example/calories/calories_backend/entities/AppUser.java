package com.example.calories.calories_backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"records"})
@ToString(exclude = {"records","password","passwordHash"})
@JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "USER")
public class AppUser {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String username;

    @Version
    @JsonIgnore
    private
    Long version;

    @Transient
    @JsonIgnore
    private String password;

    @JsonIgnore
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "daily_expectation")
    private Integer dailyExpectation;

    @JsonIgnore
    @OneToMany(mappedBy = "appUser", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Record> records;

    public void setPassword(String password){
        this.password = password;
        this.passwordHash = PASSWORD_ENCODER.encode(password);
    }

    @Builder
    public AppUser(String username, String password, Role role, Integer dailyExpectation) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.dailyExpectation = dailyExpectation;
        this.passwordHash = PASSWORD_ENCODER.encode(password);
    }
}
