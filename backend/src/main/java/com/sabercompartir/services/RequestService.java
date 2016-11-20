package com.sabercompartir.services;

import com.sabercompartir.domain.Request;
import com.sabercompartir.enums.EstadoSolicitud;
import com.sabercompartir.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matias on 18/11/16.
 */
@Service
public class RequestService {

    @Autowired
    RequestRepository requestRepository;

    public List<Request> getAll() {
        return requestRepository.findAll();
    }

    public Request getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public void update(Long id) {
        Request request = requestRepository.findById(id);
        request.setState(EstadoSolicitud.A_REALIZARSE);
        requestRepository.save(request);
    }
}
