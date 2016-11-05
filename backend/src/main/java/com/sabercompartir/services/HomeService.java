package com.sabercompartir.services;

import com.sabercompartir.domain.Resquest;
import com.sabercompartir.repository.HomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class HomeService {

    @Autowired
    HomeRepository homeRepository;

    public List<Resquest> getAll() {
        return homeRepository.findAll();
    }

}
