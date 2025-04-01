package com.example.exweb.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "price")
	private Integer price;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "image_name")
	private String imageName;

	public void setImageName(String hashedImageName) {
		// TODO 自動生成されたメソッド・スタブ
		
	}

	public void setImageUrl(String string) {
		// TODO 自動生成されたメソッド・スタブ
		
	}
	
	

}
