package com.adsvora.service;

import com.adsvora.dto.BlogDto;
import com.adsvora.model.Blog;
import com.adsvora.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;

    public Page<BlogDto> getAllBlogs(Pageable pageable) {
        return blogRepository.findAll(pageable)
                .map(this::convertToDto);
    }

    public BlogDto getBlogById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        return convertToDto(blog);
    }

    public BlogDto getBlogBySlug(String slug) {
        Blog blog = blogRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        return convertToDto(blog);
    }

    public BlogDto createBlog(BlogDto blogDto) {
        String slug = generateSlug(blogDto.getTitle());
        Blog blog = Blog.builder()
                .title(blogDto.getTitle())
                .slug(slug)
                .content(blogDto.getContent())
                .excerpt(blogDto.getExcerpt())
                .imageUrl(blogDto.getImageUrl())
                .author(blogDto.getAuthor())
                .category(blogDto.getCategory())
                .createdAt(LocalDateTime.now())
                .build();

        blog = blogRepository.save(blog);
        return convertToDto(blog);
    }

    public BlogDto updateBlog(Long id, BlogDto blogDto) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        blog.setTitle(blogDto.getTitle());
        blog.setContent(blogDto.getContent());
        blog.setExcerpt(blogDto.getExcerpt());
        blog.setImageUrl(blogDto.getImageUrl());
        blog.setAuthor(blogDto.getAuthor());
        blog.setCategory(blogDto.getCategory());
        blog.setUpdatedAt(LocalDateTime.now());

        blog = blogRepository.save(blog);
        return convertToDto(blog);
    }

    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }

    private BlogDto convertToDto(Blog blog) {
        return BlogDto.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .slug(blog.getSlug())
                .content(blog.getContent())
                .excerpt(blog.getExcerpt())
                .imageUrl(blog.getImageUrl())
                .author(blog.getAuthor())
                .category(blog.getCategory())
                .publishedAt(blog.getPublishedAt())
                .createdAt(blog.getCreatedAt())
                .updatedAt(blog.getUpdatedAt())
                .build();
    }

    private String generateSlug(String title) {
        return title.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-|-$", "");
    }
}
