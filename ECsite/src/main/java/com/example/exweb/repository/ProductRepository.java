package com.example.exweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.exweb.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

}
