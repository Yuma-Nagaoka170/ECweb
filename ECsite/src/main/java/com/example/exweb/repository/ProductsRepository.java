package com.example.exweb.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.exweb.entity.Product;

public interface ProductsRepository extends JpaRepository <Product, Integer> {
	public Page<Product> findByNameLike(String keyword, Pageable pageable);

}
