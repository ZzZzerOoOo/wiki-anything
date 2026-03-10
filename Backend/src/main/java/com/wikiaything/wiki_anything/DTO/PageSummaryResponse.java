package com.wikiaything.wiki_anything.DTO;

import java.time.Instant;
public record PageSummaryResponse(
        Long id,
        String title,
        String slug,
        Instant updatedAt
) {}

