package com.example.exweb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.exweb.model.User;
import com.example.exweb.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Override
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	@Override
	public Optional<User> getUserById(Long id){
		return userRepository.findById(id);
	}
	
	@Override
	public User createUser(User user) {
		return userRepository.save(user);
		
	}
	
	@Override
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}
	
	 @Override
	    public User authenticate(String email, String password) {
	        Optional<User> userOpt = userRepository.findByEmail(email);
	        if (userOpt.isPresent()) {
	            User user = userOpt.get();
	            if (passwordEncoder.matches(password, user.getPassword())) {
	                return user;
	            }
	        }
	        return null; // 認証失敗
	    }

}
