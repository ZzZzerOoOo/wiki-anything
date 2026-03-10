package com.wikiaything.wiki_anything.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wikiaything.wiki_anything.model.Wiki;

public interface WikiRepository extends JpaRepository<Wiki, Long> {

    Optional<Wiki> findBySlug(String slug);

    boolean existsBySlugAnd(String slug);
}

