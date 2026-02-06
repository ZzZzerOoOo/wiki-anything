package com.wikiaything.wiki_anything.DTO;

public record BlockResponse(
        String type,
        String content,
        int orderIndex
) {}