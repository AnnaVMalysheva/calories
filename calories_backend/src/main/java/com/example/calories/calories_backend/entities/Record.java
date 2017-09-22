package com.example.calories.calories_backend.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Table(name = "USER_RECORDS")
@AllArgsConstructor
@Builder
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    AppUser appUser;

    @Column(name = "text")
    String description;

    @Column(name = "caloricity")
    Integer caloricity;

    LocalTime time;

    LocalDate createdDate;

    public Record() {
    }
}
