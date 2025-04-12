package com.example.ExpenseManagement.Expense.Tracker.Controllers;

import com.example.ExpenseManagement.Expense.Tracker.Models.Expense;
import com.example.ExpenseManagement.Expense.Tracker.Models.User;
import com.example.ExpenseManagement.Expense.Tracker.Repo.ExpenseRepo;
import com.example.ExpenseManagement.Expense.Tracker.Services.CategoryService;
import com.example.ExpenseManagement.Expense.Tracker.Services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // Get all expenses for the authenticated user
    @GetMapping
    public List<Expense> getAllExpenses() {
        // Temporarily fetch expenses without user authentication
        return expenseService.getAllExpenses();
    }


    // Add a new expense
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense, @AuthenticationPrincipal User user) {
        expense.setUser(user);  // Ensure the expense is tied to the authenticated user
        return expenseService.saveExpense(expense);  // Save the expense using the service layer
    }


    // Delete an expense by ID
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }

    // Get recent expenses for the authenticated user
    @GetMapping("/recent")
    public List<Expense> getRecentExpenses(@AuthenticationPrincipal User user) {
        return expenseService.getRecentExpenses(user);
    }

    // Get the total expenses amount
    @GetMapping("/total")
    public Map<String, Double> getTotalExpenses(@AuthenticationPrincipal User user) {
        double total = expenseService.getTotalExpenses(user);
        return Map.of("totalExpenses", total);
    }

    // Get expenses grouped by category
    @GetMapping("/by-category")
    public Map<String, Double> getExpensesByCategory(@AuthenticationPrincipal User user) {
        return expenseService.getExpensesByCategory(user);
    }

    // Get expense trends over time
    @GetMapping("/trends")
    public Map<String, Double> getExpenseTrends(@AuthenticationPrincipal User user) {
        return expenseService.getExpenseTrends(user);
    }
}
