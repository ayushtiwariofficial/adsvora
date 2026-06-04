package com.adsvora.repository;

import com.adsvora.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    Optional<Service> findBySlug(String slug);
    List<Service> findAllByOrderByOrderAsc();
}
