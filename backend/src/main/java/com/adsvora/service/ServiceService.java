package com.adsvora.service;

import com.adsvora.dto.ServiceDto;
import com.adsvora.model.Service;
import com.adsvora.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public List<ServiceDto> getAllServices() {
        return serviceRepository.findAllByOrderByOrderAsc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ServiceDto getServiceById(Long id) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));
        return convertToDto(service);
    }

    public ServiceDto createService(ServiceDto serviceDto) {
        String slug = generateSlug(serviceDto.getName());
        Service service = Service.builder()
                .name(serviceDto.getName())
                .slug(slug)
                .description(serviceDto.getDescription())
                .icon(serviceDto.getIcon())
                .features(serviceDto.getFeatures())
                .imageUrl(serviceDto.getImageUrl())
                .order(serviceDto.getOrder())
                .createdAt(LocalDateTime.now())
                .build();

        service = serviceRepository.save(service);
        return convertToDto(service);
    }

    public ServiceDto updateService(Long id, ServiceDto serviceDto) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        service.setName(serviceDto.getName());
        service.setDescription(serviceDto.getDescription());
        service.setIcon(serviceDto.getIcon());
        service.setFeatures(serviceDto.getFeatures());
        service.setImageUrl(serviceDto.getImageUrl());
        service.setOrder(serviceDto.getOrder());
        service.setUpdatedAt(LocalDateTime.now());

        service = serviceRepository.save(service);
        return convertToDto(service);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }

    private ServiceDto convertToDto(Service service) {
        return ServiceDto.builder()
                .id(service.getId())
                .name(service.getName())
                .slug(service.getSlug())
                .description(service.getDescription())
                .icon(service.getIcon())
                .features(service.getFeatures())
                .imageUrl(service.getImageUrl())
                .order(service.getOrder())
                .createdAt(service.getCreatedAt())
                .updatedAt(service.getUpdatedAt())
                .build();
    }

    private String generateSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-|-$", "");
    }
}
