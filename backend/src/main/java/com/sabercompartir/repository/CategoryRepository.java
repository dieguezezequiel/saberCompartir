package com.sabercompartir.repository;

import com.sabercompartir.domain.Category;
import com.sabercompartir.domain.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by redbee on 24/11/16.
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findById(Long id);
}
