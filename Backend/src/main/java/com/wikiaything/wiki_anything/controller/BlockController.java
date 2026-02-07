package com.wikiaything.wiki_anything.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.wikiaything.wiki_anything.DTO.BlockResponse;
import com.wikiaything.wiki_anything.DTO.CreateBlockRequest;
import com.wikiaything.wiki_anything.DTO.UpdateBlockRequest;
import com.wikiaything.wiki_anything.service.BlockService;

import lombok.RequiredArgsConstructor;

@RestController

@RequiredArgsConstructor
public class BlockController {

    private final BlockService blockService;

    @PostMapping
    @RequestMapping("/pages/{pageId}/blocks")
    @ResponseStatus(HttpStatus.CREATED)
    public BlockResponse addBlock(
            @PathVariable Long pageId,
            @RequestBody CreateBlockRequest request
    ) {
        return blockService.addBlock(pageId,request);
    }

    @PutMapping("/pages/{pageId}/blocks/{id}")
    public BlockResponse editBlock(@PathVariable Long pageId,
            @RequestBody UpdateBlockRequest request) {
            return blockService.editBlock(pageId, request);
            
    }
    @PutMapping("/pages/{pageId}/blocks/{id}/{direction}")
    public List<BlockResponse> moveBlock(@PathVariable Long pageId,
            @PathVariable String direction,
            @RequestBody UpdateBlockRequest request) {
            return blockService.moveBlock(pageId, request, direction);
            
    }

    @DeleteMapping("/pages/{pageId}/blocks/{id}")
    public List<BlockResponse> deleteBlock(@PathVariable Long pageId, 
        @PathVariable("id") int id) {
            System.out.println("Deleting block: " + id + " from page: " + pageId);
            return blockService.deleteBlock(pageId, id);
            
    }
}
