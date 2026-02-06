package com.wikiaything.wiki_anything.repository;

import com.wikiaything.wiki_anything.model.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PageRepository extends JpaRepository<Page, Long> {

    Optional<Page> findBySlug(String slug);

    boolean existsBySlug(String slug);
}

