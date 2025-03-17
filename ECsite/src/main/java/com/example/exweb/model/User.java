package com.example.exweb.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false, unique = true)
	private String email;
	
	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false)
	private boolean verified = false;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String address;
	
	@Column(nullable = false, name = "phone_number")
	private String phoneNumber;
	
	@Column(nullable = false)
	private String gender;
	

}
