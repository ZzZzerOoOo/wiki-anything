package com.wikiaything.wiki_anything.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wikiaything.wiki_anything.model.Block;

public interface BlockRepository extends JpaRepository<Block, Long> {

    List<Block> findByPageIdOrderByOrderIndexAsc(Long pageId);
}



