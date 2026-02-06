package com.wikiaything.wiki_anything.DTO;

import com.wikiaything.wiki_anything.model.BlockType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateBlockRequest(
        @NotNull BlockType type,
        @NotBlank String content
) {}