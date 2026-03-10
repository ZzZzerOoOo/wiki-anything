package com.wikiaything.wiki_anything.DTO;

import jakarta.validation.constraints.NotBlank;

public record CreateWikiRequest(
        @NotBlank String title
) {}
