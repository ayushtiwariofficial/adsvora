package com.adsvora.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogDto {
    private Long id;
    private String title;
    private String slug;
    private String content;
    private String excerpt;
    private String imageUrl;
    private String author;
    private String category;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
