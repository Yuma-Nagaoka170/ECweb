package com.example.exweb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.exweb.model.User;

@Service
public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User createUser(User user);
    void deleteUser(Long id);

    // ここを修正する
    Optional<User> authenticate(String email, String password);
}

