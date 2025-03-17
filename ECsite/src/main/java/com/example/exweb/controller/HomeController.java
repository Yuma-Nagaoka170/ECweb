package com.example.exweb.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.exweb.model.Product;
import com.example.exweb.service.ProductService;

@Controller
public class HomeController {
	private final ProductService productService;
	
	public HomeController(ProductService productService) {
		this.productService = productService;
	}
	
	@GetMapping("/")
	public String home(Model model) {
		List<Product> products = productService.getAllProducts();
		model.addAttribute("products", products);
		return "index";
	}
	
	

}
