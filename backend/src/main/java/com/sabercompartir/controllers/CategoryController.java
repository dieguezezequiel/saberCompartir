package com.sabercompartir.controllers;

import com.sabercompartir.domain.Category;
import com.sabercompartir.domain.Request;
import com.sabercompartir.enums.EstadoSolicitud;
import com.sabercompartir.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by redbee on 24/11/16.
 */
@RestController
@CrossOrigin
@RequestMapping(UrlMappings.BASE + UrlMappings.CATEGORY)
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Category> getAll(){
        List<Category> categories = this.categoryService.getAll();

        return categories;
    }

}
