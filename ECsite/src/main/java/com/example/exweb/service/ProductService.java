package com.example.exweb.service;

import java.util.List;

import com.example.exweb.model.Product;

public interface ProductService {
	List<Product> getAllProducts();
	Product getProductById(long id);

}
