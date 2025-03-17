package com.example.exweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.exweb.model.Product;
import com.example.exweb.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {
	private final ProductRepository productRepository;
	
	public ProductServiceImpl(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	@Override
	public List<Product> getAllProducts(){
		return productRepository.findAll();
	}
	
	@Override
	public Product getProductById(long id) {
		return productRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("商品が見つかりません"));
	}

}
 