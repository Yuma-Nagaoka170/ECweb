package com.example.exweb.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.exweb.entity.Product;
import com.example.exweb.form.ProductEditForm;
import com.example.exweb.form.ProductRegisterForm;
import com.example.exweb.repository.ProductsRepository;
import com.example.exweb.service.ProductService;

@Controller
@RequestMapping("/admin/products")
public class AdminProductsController {
	private final ProductsRepository productsRepository;
	private final ProductService productService;
	
	public AdminProductsController(ProductsRepository productsRepository,ProductService productService) {
		this.productsRepository = productsRepository;
		this.productService = productService;
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

@GetMapping("/register")
public String register(Model model) {
	model.addAttribute("productRegisterForm", new ProductRegisterForm());
	return "admin/products/register";
	}

@PostMapping("/create")
public String create(@ModelAttribute @Validated ProductRegisterForm productRegisterForm, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
	if (bindingResult.hasErrors()) {
		return "admin/products/register";
	}
	
	productService.create(productRegisterForm);
	redirectAttributes.addFlashAttribute("successMessage","商品を登録しました。");
	
	return "redirect:/admin/products";
}

@GetMapping("/{id}/edit")

public String edit(@PathVariable(name = "id") Integer id, Model model) {
	Product product = productsRepository.getReferenceById(id);
	String imageName = product.getImageName();
	
	ProductEditForm productEditForm = new ProductEditForm(product.getId(), product.getName(), null, product.getDescription(), product.getPrice());
	
	model.addAttribute("imageName", imageName);
	model.addAttribute("productEditForm",productEditForm);
	
	return "admin/products/edit";
}

@PostMapping("/{id}/update")
public String update(@ModelAttribute @Validated ProductEditForm productEditForm, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
	if (bindingResult.hasErrors()) {
		return "admin/products/edit";
	}
	
	productService.update(productEditForm);
	redirectAttributes.addFlashAttribute("successMessage", "商品を編集しました。");
	
	return "redirect:/admin/products";
}



}
