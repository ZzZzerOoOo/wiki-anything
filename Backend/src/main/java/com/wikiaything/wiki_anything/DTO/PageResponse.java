package com.wikiaything.wiki_anything.DTO;

import java.util.List;
public record PageResponse(
        Long id,
        String title,
        String slug,
        List<BlockResponse> blocks
) {}
