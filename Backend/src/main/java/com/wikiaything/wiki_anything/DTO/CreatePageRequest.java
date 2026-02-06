package com.wikiaything.wiki_anything.DTO;

import jakarta.validation.constraints.NotBlank;

public record CreatePageRequest(
        @NotBlank String title
) {}
