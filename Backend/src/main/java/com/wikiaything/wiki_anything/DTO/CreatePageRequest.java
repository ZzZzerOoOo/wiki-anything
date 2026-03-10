package com.wikiaything.wiki_anything.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreatePageRequest(
        @NotBlank String title,
        @NotNull Long wikiId
) {}
