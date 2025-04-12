package com.example.ExpenseManagement.Expense.Tracker.Repo;

import com.example.ExpenseManagement.Expense.Tracker.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {
}


