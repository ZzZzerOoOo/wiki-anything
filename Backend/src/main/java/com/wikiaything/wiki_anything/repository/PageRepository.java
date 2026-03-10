package com.wikiaything.wiki_anything.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wikiaything.wiki_anything.model.Page;

public interface PageRepository extends JpaRepository<Page, Long> {

    Optional<Page> findBySlugAndwiki_id(String slug,String wiki_id);

    boolean existsBySlugAndwiki_id(String slug, String wiki_id);
}

