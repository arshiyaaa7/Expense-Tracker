package com.example.ExpenseManagement.Expense.Tracker.Services;

import com.example.ExpenseManagement.Expense.Tracker.Models.Category;
import com.example.ExpenseManagement.Expense.Tracker.Repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    // Fetch all categories
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    // Add a new category
    public Category addCategory(Category category) {
        return categoryRepo.save(category);
    }

    // Update a category
    public Category updateCategory(Long id, Category category) {
        category.setId(id);
        return categoryRepo.save(category);
    }

    // Delete a category by ID
    public void deleteCategory(Long id) {
        categoryRepo.deleteById(id);
    }

    // Get category by ID
    public Category getCategoryById(Long id) {
        return categoryRepo.findById(id).orElse(null);
    }
}
