package com.wikiaything.wiki_anything.service;

import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wikiaything.wiki_anything.DTO.BlockResponse;
import com.wikiaything.wiki_anything.DTO.CreatePageRequest;
import com.wikiaything.wiki_anything.DTO.PageResponse;
import com.wikiaything.wiki_anything.model.Page;
import com.wikiaything.wiki_anything.repository.PageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PageService {
private final PageRepository pageRepository;
   public PageResponse createPage(CreatePageRequest request) {
        String title = request.title();
        String slug = generateSlug(title);  
        if (pageRepository.existsBySlug(slug)) {
            throw new IllegalArgumentException("Page with same title already exists");
        }   

        Page page = new Page();
        page.setTitle(title);
        page.setSlug(slug);
        
        return toPageResponse(pageRepository.save(page));
    }

    public PageResponse getPageResponseBySlug(String slug) {
        Page page = pageRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Page not found"));
        return toPageResponse(page);
    }

    public List<PageResponse> getAllPages() {
        return pageRepository.findAll().stream()
                .map(this::toPageResponse)
                .toList();
    }
    public PageResponse deletePage(String slug) {
        Page page = pageRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Page not found"));
        pageRepository.delete(page);
        return toPageResponse(page);
    }

// MAPPER: PUT BELOW TO UTILITY LATER
private PageResponse toPageResponse(Page page) {
    List<BlockResponse> blocks = page.getBlocks().stream()
            .map(b -> new BlockResponse(
                    b.getType().name(),
                    b.getContent(),
                    b.getOrderIndex()
            ))
            .toList();

    return new PageResponse(
            page.getId(),
            page.getTitle(),
            page.getSlug(),
            blocks
    );
}

    private String generateSlug(String title) {
        return title
                .toLowerCase(Locale.ROOT)
                .trim()
                .replaceAll("[^a-z0-9]+", "-");
    }
}