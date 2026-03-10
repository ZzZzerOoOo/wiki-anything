package com.wikiaything.wiki_anything.service;

import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wikiaything.wiki_anything.DTO.BlockResponse;
import com.wikiaything.wiki_anything.DTO.CreatePageRequest;
import com.wikiaything.wiki_anything.DTO.PageResponse;
import com.wikiaything.wiki_anything.model.Page;
import com.wikiaything.wiki_anything.model.Wiki;
import com.wikiaything.wiki_anything.repository.PageRepository;
import com.wikiaything.wiki_anything.repository.WikiRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PageService {
private final PageRepository pageRepository;
private final WikiRepository wikiRepository;
   public PageResponse createPage(CreatePageRequest request) {
        String title = request.title();
        Long wikiId = request.wikiId();
        String slug = generateSlug(title);  
        if (pageRepository.existsBySlugAndWikiId(slug,wikiId)) {
            throw new IllegalArgumentException("Page with same title already exists");
        }   

        Wiki wiki = wikiRepository.findById(wikiId)
        .orElseThrow(() -> new RuntimeException("Wiki not found"));

        Page page = new Page();
        page.setTitle(title);
        page.setWiki(wiki);
        page.setSlug(slug);
        
        return toPageResponse(pageRepository.save(page));
    }

    public PageResponse getPageResponseBySlug(String slug, Long wikiId) {
        Page page = pageRepository.findBySlugAndWikiId(slug,wikiId)
                .orElseThrow(() -> new IllegalArgumentException("Page not found"));
        return toPageResponse(page);
    }

    public List<PageResponse> getAllPages() {
        return pageRepository.findAll().stream()
                .map(this::toPageResponse)
                .toList();
    }
    public PageResponse deletePage(String slug, Long wikiId) {
        Page page = pageRepository.findBySlugAndWikiId(slug,wikiId)
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
            blocks,
            page.getUpdatedAt()
    );
}

    private String generateSlug(String title) {
        return title
                .toLowerCase(Locale.ROOT)
                .trim()
                .replaceAll("[^a-z0-9]+", "-");
    }
}