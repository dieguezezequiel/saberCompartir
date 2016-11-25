package com.sabercompartir.services;

import com.sabercompartir.domain.Category;
import com.sabercompartir.domain.ClassRoom;
import com.sabercompartir.domain.Request;
import com.sabercompartir.domain.User;
import com.sabercompartir.enums.EstadoSolicitud;
import com.sabercompartir.repository.RequestRepository;
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

    public Page<Request> getByStateAndUser(EstadoSolicitud state, Long userId, Pageable pageable) {
        User user = userRepository.findById(userId);
        return requestRepository.findByStateAndUser(state, user, pageable);
    }

    public List<EstadoSolicitud> getRequestStates() {
        return null;
    }

    public Page<Request> getAllBySearch(String searchValue, Pageable pageable) {
        return requestRepository.findAllBySearchValue(searchValue,pageable);
    }

    public Long save(Request request, Principal userAuthenticated) {
        User user = this.userRepository.findByUsername(userAuthenticated.getName());
        Category category = this.categoryService.getById(request.getCategory().getId());
        request.setUser(user);
        request.setState(EstadoSolicitud.A_REALIZARSE);
        request.setPoints(0);
        request.setPoints(0);
        request.setCategory(category);
        Request persistedRequest = requestRepository.save(request);

        return persistedRequest.getId();
    }
}
