package com.example.exweb.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.exweb.entity.Product;
import com.example.exweb.repository.ProductsRepository;

@Controller
@RequestMapping("/admin/products")
public class AdminProductsController {
	private final ProductsRepository productsRepository;
	
	public AdminProductsController(ProductsRepository productsRepository) {
		this.productsRepository = productsRepository;
}

@GetMapping
public String index(Model model, @PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable, @RequestParam(name = "keyword", required = false) String keyword) {
	Page<Product> productPage;
	
	if (keyword !=null && !keyword.isEmpty()) {
		productPage = productsRepository.findByNameLike("%" + keyword + "%", pageable);
	}else {
		productPage = productsRepository.findAll(pageable);
	}
	
	model.addAttribute("productPage", productPage);
	model.addAttribute("keyword", keyword);
	
	return "admin/products/index";

}

@GetMapping("/{id}")
public String show(@PathVariable(name = "id") Integer id, Model model) {
	Product product = productsRepository.getReferenceById(id);
	
	model.addAttribute("product",product);
	
	return "admin/products/show";
}
}
