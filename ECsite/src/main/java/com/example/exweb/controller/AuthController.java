package com.example.exweb.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exweb.dto.LoginRequest;
import com.example.exweb.dto.LoginResponse;
import com.example.exweb.model.User;
import com.example.exweb.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private final UserService userService;
	
	public AuthController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
		User user = userService.authenticate(request.getEmail(), request.getPassword()).orElse(null);
		if (user == null) {
			return ResponseEntity.status(401).build();
		}
		
		return ResponseEntity.ok(new LoginResponse("dummy-token"));
	}

}
