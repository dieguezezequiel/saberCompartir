package com.sabercompartir.dao;

import org.hibernate.criterion.DetachedCriteria;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * Created by matias on 08/10/16.
 */
public interface BaseDAO<T extends Serializable, E> {

    //TODO: Hay que ver qué sirve y qué no y volarlo, es un copypaste furioso.
    public void deleteAll(Collection<T> instances) throws Exception;

    public E save(T instance) throws Exception;

    public void saveOrUpdateAll(Collection<T> instances) throws Exception;

    public void saveOrUpdate(T instance) throws Exception;

    public void persist(T transientInstance) throws Exception;

    //public void attachDirty(T instance) throws Exception;

    //public void attachClean(T instance) throws Exception;

    public void delete(T persistentInstance) throws Exception;

    public List<T> findByExample(T instance) throws Exception;

    public List<T> findByQuery(String query) throws Exception;

    public List<Map<String, Object>> findMapByQuery(String queryString)
            throws Exception;

    public List<T> findByCriteria(DetachedCriteria criteria) throws Exception;

    public T merge(T detachedInstance) throws Exception;

    public List<T> findAll() throws Exception;

    public T findById(E id) throws Exception;
}
