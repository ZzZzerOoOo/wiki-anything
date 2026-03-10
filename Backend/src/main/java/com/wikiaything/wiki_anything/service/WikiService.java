package com.wikiaything.wiki_anything.service;

import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wikiaything.wiki_anything.DTO.CreateWikiRequest;
import com.wikiaything.wiki_anything.DTO.PageSummaryResponse;
import com.wikiaything.wiki_anything.DTO.WikiResponse;
import com.wikiaything.wiki_anything.model.Wiki;
import com.wikiaything.wiki_anything.repository.WikiRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class WikiService {
private final WikiRepository WikiRepository;
   public WikiResponse createWiki(CreateWikiRequest request) {
        String title = request.title();
        String slug = generateSlug(title);  
        if (WikiRepository.existsBySlug(slug)) {
            throw new IllegalArgumentException("Wiki with same title already exists");
        }   

        Wiki Wiki = new Wiki();
        Wiki.setTopic(title);
        Wiki.setSlug(slug);
        
        return toWikiResponse(WikiRepository.save(Wiki));
    }

    public WikiResponse getWikiResponseBySlug(String slug) {
        Wiki Wiki = WikiRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Wiki not found"));
        return toWikiResponse(Wiki);
    }

    public List<WikiResponse> getAllWikis() {
        return WikiRepository.findAll().stream()
                .map(this::toWikiResponse)
                .toList();
    }
    public WikiResponse deleteWiki(String slug) {
        Wiki Wiki = WikiRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Wiki not found"));
        WikiRepository.delete(Wiki);
        return toWikiResponse(Wiki);
    }

// MAPPER: PUT BELOW TO UTILITY LATER
private WikiResponse toWikiResponse(Wiki Wiki) {
    List<PageSummaryResponse> pages = Wiki.getPages().stream()
            .map(b -> new PageSummaryResponse(
                    b.getId(),
                    b.getTitle(),
                    b.getSlug(),
                    b.getUpdatedAt()
            ))
            .toList();

    return new WikiResponse(
            Wiki.getId(),
            Wiki.getTopic(),
            Wiki.getSlug(),
            pages,
            Wiki.getUpdatedAt()
    );
}

    private String generateSlug(String title) {
        return title
                .toLowerCase(Locale.ROOT)
                .trim()
                .replaceAll("[^a-z0-9]+", "-");
    }
}