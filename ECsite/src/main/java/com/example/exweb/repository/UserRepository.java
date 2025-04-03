package com.example.exweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.exweb.entity.User;

public interface UserRepository extends JpaRepository <User, Integer>{
	public User findByEmail(String email);

}
