package com.own.controller;

import com.own.entity.Category;
import com.own.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/v1")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("/category")
    public Category[] getCategories() {
        return categoryRepository.findByParentNull();
    }

    @PostMapping("/category")
    public Category addCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }
}
