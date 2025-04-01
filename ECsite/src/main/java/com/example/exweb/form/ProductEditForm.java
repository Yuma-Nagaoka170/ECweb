package com.example.exweb.form;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductEditForm {
	@NotNull
	private Integer id;
	
	@NotBlank(message = "商品名を入力してください。")
	private String name;
	
	private MultipartFile imageFile;
	
	@NotBlank(message = "説明を入力してください")
	private String description;
	
	@NotNull(message = "料金を入力してください。")
	@Min(value = 1, message = "値段は1円以上に設定指定ください。")
	private Integer price;
	

}
