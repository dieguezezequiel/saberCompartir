package com.sabercompartir.services;

import com.sabercompartir.domain.Request;
import com.sabercompartir.repository.HomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class HomeService {

    @Autowired
    HomeRepository homeRepository;

    public List<Request> getAll() {
        return homeRepository.findAll();
    }

}
