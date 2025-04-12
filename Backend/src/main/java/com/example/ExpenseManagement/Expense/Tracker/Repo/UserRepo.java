package com.example.ExpenseManagement.Expense.Tracker.Repo;

import com.example.ExpenseManagement.Expense.Tracker.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
