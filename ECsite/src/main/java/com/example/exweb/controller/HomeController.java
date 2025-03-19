package com.example.exweb.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exweb.model.Product;
import com.example.exweb.service.ProductService;

@RestController
@RequestMapping("/api")
public class HomeController {
	private final ProductService productService;
	
	public HomeController(ProductService productService) {
		this.productService = productService;
	}
	
	@GetMapping("/")
	 public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}
	
	

}
