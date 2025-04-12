package com.example.ExpenseManagement.Expense.Tracker.Services;

import com.example.ExpenseManagement.Expense.Tracker.Models.Expense;
import com.example.ExpenseManagement.Expense.Tracker.Models.User;
import com.example.ExpenseManagement.Expense.Tracker.Repo.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepo expenseRepository;

    // Fetch all expenses for a specific user
    public List<Expense> getAllExpenses(User user) {
        return expenseRepository.findByUser(user);
    }

    // Fetch all expenses without user filtering (admin view)
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }


    // Save a new expense
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);  // Save the expense to the database
    }


    // Delete an expense by ID
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    // Fetch the 5 most recent expenses for the user
    public List<Expense> getRecentExpenses(User user) {
        return expenseRepository.findByUserOrderByDateDesc(user).stream()
                .limit(5)
                .collect(Collectors.toList());
    }

    // Calculate the total expenses for the user
    public double getTotalExpenses(User user) {
        return expenseRepository.findByUser(user).stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    // Group expenses by category and calculate the total amount for each category
    public Map<String, Double> getExpensesByCategory(User user) {
        return expenseRepository.findByUser(user).stream()
                .filter(expense -> expense.getCategory() != null) // Ensure category is not null
                .collect(Collectors.groupingBy(
                        expense -> expense.getCategory().getName(),  // Use the category name for grouping
                        Collectors.summingDouble(Expense::getAmount)  // Sum the amounts for each category
                ));
    }


    // Group expenses by date and calculate the total amount for each day (expense trends)
    public Map<String, Double> getExpenseTrends(User user) {
        return expenseRepository.findByUser(user).stream()
                .collect(Collectors.groupingBy(
                        expense -> expense.getDate().toString(),
                        Collectors.summingDouble(Expense::getAmount)
                ));
    }

    // Group expenses by month and calculate the total amount for each month (for income vs expenses chart)
    public Map<String, Double> getMonthlyExpenseTrends(User user) {
        return expenseRepository.findByUser(user).stream()
                .collect(Collectors.groupingBy(
                        expense -> expense.getDate().getMonth().name(),
                        Collectors.summingDouble(Expense::getAmount)
                ));
    }

    // Fetch total income (assuming a positive amount indicates income)
    public double getTotalIncome(User user) {
        return expenseRepository.findByUser(user).stream()
                .filter(expense -> expense.getAmount() > 0)
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    // Fetch total balance (income - expenses)
    public double getTotalBalance(User user) {
        double income = getTotalIncome(user);
        double expenses = getTotalExpenses(user);
        return income - expenses;
    }
}
