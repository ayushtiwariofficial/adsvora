package com.adsvora.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceDto {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String icon;
    private List<String> features;
    private String imageUrl;
    private Integer order;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
