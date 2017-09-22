package com.example.calories.calories_backend.repositories;



import com.example.calories.calories_backend.entities.Record;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.LocalDate;
import java.util.List;

public interface RecordRepository extends PagingAndSortingRepository<Record, Integer> {
//    @PreAuthorize("hasAnyRole('ROLE_USER')")
//    List<Record> findByUserId(@Param("userId") Integer userId);
//
//    @PreAuthorize("hasAnyRole('ROLE_USER')")
//    List<Record> findByUserIdAndCreatedDate(@Param("userId") Integer userId, @Param("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date);
//
//    @PreAuthorize("hasAnyRole('ROLE_USER')")
//    @Query("select DISTINCT rec.createdDate  from Record rec")
//    List<LocalDate> findCreatedDates();
//
//
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
//    List<Record> findAll();
//
//    List<Record> findByUserIdAndCreatedDateGreaterThanEqualOrderByCreatedDateAsc(@Param("userId") Integer userId, @Param("dateFrom") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date);
//
//    List<Record> findByUserIdAndCreatedDateLessThanEqualOrderByCreatedDateAsc(@Param("userId") Integer userId, @Param("dateTo") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date);
//    List<Record> findByUserIdAndCreatedDateBetweenOrderByCreatedDateAsc(@Param("userId") Integer userId, @Param("dateFrom") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateFrom, @Param("dateTo") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateTo);
}
