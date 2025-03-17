package com.example.exweb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
		
	}
	
	protected void configure(HttpSecurity http) throws Exception{
		http
		.authorizeHttpRequests(auth -> auth
		.requestMatchers("api/auth/**").permitAll()
		.anyRequest().authenticated()
				)
		.csrf(csrf -> csrf.disable());
		
	}

}
