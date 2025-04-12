package com.example.ExpenseManagement.Expense.Tracker.Repo;

import com.example.ExpenseManagement.Expense.Tracker.Models.Expense;
import com.example.ExpenseManagement.Expense.Tracker.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface ExpenseRepo extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);
    List<Expense> findByUserOrderByDateDesc(User user);
}


