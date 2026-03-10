package com.wikiaything.wiki_anything.DTO;

import java.time.Instant;
import java.util.List;
public record WikiResponse(
        Long id,
        String title,
        String slug,
        List<PageSummaryResponse> pages,
        Instant updatedAt
) {}


