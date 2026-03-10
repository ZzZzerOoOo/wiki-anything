package com.wikiaything.wiki_anything.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wikiaything.wiki_anything.model.Page;

public interface PageRepository extends JpaRepository<Page, Long> {

    Optional<Page> findBySlugAndWikiId(String slug, Long wiki_id);

    boolean existsBySlugAndWikiId(String slug, Long wiki_id);
}

