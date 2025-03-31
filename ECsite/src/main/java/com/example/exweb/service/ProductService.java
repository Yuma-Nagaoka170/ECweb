package com.example.exweb.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.exweb.entity.Product;
import com.example.exweb.form.ProductRegisterForm;
import com.example.exweb.repository.ProductsRepository;

@Service
public class ProductService {
	private final ProductsRepository productsRepository;
	
	public ProductService(ProductsRepository productRepository) {
		this.productsRepository = productRepository;
	}
	
	@Transactional
	public void create(ProductRegisterForm productRegisterForm) {
		Product product = new Product();
		MultipartFile imageFile = productRegisterForm.getImageFile();
		
		if(!imageFile.isEmpty()) {
			String imageName = imageFile.getOriginalFilename();
			String hashedImageName = generateNewFileName(imageName);
			Path filePath = Paths.get("src/main/resources/static/img/" + hashedImageName);
			copyImageFile(imageFile,filePath);
			product.setImageName(hashedImageName);
		}
		
		product.setName(productRegisterForm.getName());
		product.setDescription(productRegisterForm.getDescription());
		product.setPrice(productRegisterForm.getPrice());
		
		productsRepository.save(product);
	}
	
	public String generateNewFileName(String fileName) {
		String[] fileNames = fileName.split("\\.");
		for (int i = 0; i < fileNames.length-1;i++) {
			fileNames[i] = UUID.randomUUID().toString();
		}
		String hashedFileName = String.join(".", fileNames);
		return hashedFileName;
	}
	
	public void copyImageFile(MultipartFile imageFile, Path filePath) {
		try {
			Files.copy(imageFile.getInputStream(),filePath);
		}catch (IOException e) {
			e.printStackTrace();
		}
	}

}
