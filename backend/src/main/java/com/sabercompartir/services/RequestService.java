package com.sabercompartir.services;

import com.sabercompartir.domain.*;
import com.sabercompartir.enums.EstadoSolicitud;
import com.sabercompartir.repository.RequestRepository;
import com.sabercompartir.repository.UserCredentialsRepository;
import com.sabercompartir.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

/**
 * Created by matias on 18/11/16.
 */
@Service
public class RequestService {

    @Autowired
    RequestRepository requestRepository;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    UserCredentialsRepository userCredentialsRepository;

    @Autowired
    CategoryService categoryService;

    public Page<Request> getAll(Pageable pageable) {
        return requestRepository.findAll(pageable);
    }

    public Request getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public void update(Long id) {
        Request request = requestRepository.findById(id);
        request.setState(EstadoSolicitud.A_REALIZARSE);
        requestRepository.save(request);
    }

    public Page<Request> getByStateAndUser(EstadoSolicitud state, String username, Pageable pageable) {
        User user = userRepository.findByUsername(username);
        return requestRepository.findByStateAndUser(state, user, pageable);
    }

    public List<EstadoSolicitud> getRequestStates() {
        return null;
    }

    public Page<Request> getAllBySearch(String searchValue, Pageable pageable) {
        return requestRepository.findAllBySearchValue(searchValue,pageable);
    }

    public Long save(Request request, Principal userAuthenticated) {
        UserCredentials userCredentials = this.userCredentialsRepository.findByUsername(userAuthenticated.getName());
        User user = userRepository.findById(userCredentials.getUserId());
        Category category = this.categoryService.getById(request.getCategory().getId());
        request.setUser(user);
        request.setState(EstadoSolicitud.A_REALIZARSE);
        request.setPoints(0);
        request.setPoints(0);
        request.setCategory(category);
        Request persistedRequest = requestRepository.save(request);

        return persistedRequest.getId();
    }

    public Page<Request> getAllTopAndState(Pageable pageable, String state) {
        return requestRepository.findAllByState(pageable, EstadoSolicitud.createFromString(state));
    }

    public void save(Request request) {
        requestRepository.save(request);
    }
}
