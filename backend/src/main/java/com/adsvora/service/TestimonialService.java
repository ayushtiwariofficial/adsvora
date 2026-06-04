package com.adsvora.service;

import com.adsvora.model.Testimonial;
import com.adsvora.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public List<Testimonial> getAllTestimonials() {
        return testimonialRepository.findAll();
    }

    public List<Testimonial> getFeaturedTestimonials() {
        return testimonialRepository.findByFeaturedTrue();
    }

    public Testimonial getTestimonialById(Long id) {
        return testimonialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Testimonial not found"));
    }

    public Testimonial createTestimonial(Testimonial testimonial) {
        testimonial.setCreatedAt(LocalDateTime.now());
        if (testimonial.getFeatured() == null) {
            testimonial.setFeatured(false);
        }
        return testimonialRepository.save(testimonial);
    }

    public Testimonial updateTestimonial(Long id, Testimonial testimonial) {
        Testimonial existing = testimonialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Testimonial not found"));

        existing.setClientName(testimonial.getClientName());
        existing.setClientTitle(testimonial.getClientTitle());
        existing.setClientCompany(testimonial.getClientCompany());
        existing.setContent(testimonial.getContent());
        existing.setRating(testimonial.getRating());
        existing.setImageUrl(testimonial.getImageUrl());
        existing.setFeatured(testimonial.getFeatured());
        existing.setUpdatedAt(LocalDateTime.now());

        return testimonialRepository.save(existing);
    }

    public void deleteTestimonial(Long id) {
        testimonialRepository.deleteById(id);
    }
}
