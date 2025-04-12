package com.example.ExpenseManagement.Expense.Tracker.Services;

import com.example.ExpenseManagement.Expense.Tracker.Models.User;
import com.example.ExpenseManagement.Expense.Tracker.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
