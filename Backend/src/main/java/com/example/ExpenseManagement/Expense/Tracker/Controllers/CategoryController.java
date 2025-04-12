package com.example.ExpenseManagement.Expense.Tracker.Controllers;

import com.example.ExpenseManagement.Expense.Tracker.Models.Category;
import com.example.ExpenseManagement.Expense.Tracker.Models.User;
import com.example.ExpenseManagement.Expense.Tracker.Services.CategoryService;
import com.example.ExpenseManagement.Expense.Tracker.Services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ExpenseService expenseService;

    // Get all categories
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // Get category by ID
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @GetMapping("/by-category")
    public Map<String, Double> getExpensesByCategory(@AuthenticationPrincipal User user) {
        return expenseService.getExpensesByCategory(user);
    }
    
    // Add a new category
    @PostMapping
    public Category addCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
    }

    // Update an existing category
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return categoryService.updateCategory(id, category);
    }

    // Delete a category by ID
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}
