package com.wikiaything.wiki_anything.service;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wikiaything.wiki_anything.DTO.BlockResponse;
import com.wikiaything.wiki_anything.DTO.CreateBlockRequest;
import com.wikiaything.wiki_anything.DTO.UpdateBlockRequest;
import com.wikiaything.wiki_anything.model.Block;
import com.wikiaything.wiki_anything.model.Page;
import com.wikiaything.wiki_anything.repository.BlockRepository;
import com.wikiaything.wiki_anything.repository.PageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BlockService {

    private final BlockRepository blockRepository;
    private final PageRepository pageRepository;

    // ===== PUBLIC API METHOD (DTO ↔ DTO) =====

    public BlockResponse addBlock(Long pageId, CreateBlockRequest request) {
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new IllegalArgumentException("Page not found"));

        int nextOrderIndex = page.getBlocks().size();

        Block block = new Block();
        block.setType(request.type());
        block.setContent(request.content());
        block.setOrderIndex(nextOrderIndex);
        block.setPage(page);
        
        
        Block saved = blockRepository.save(block);
        page.setUpdatedAt(Instant.now());
        return toBlockResponse(saved);
    }
    public List<BlockResponse> deleteBlock(Long pageId, int blockOrdexIndex) {
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new IllegalArgumentException("Page not found"));
            
        Block block = page.getBlocks().stream()
                .filter(b -> b.getOrderIndex() == blockOrdexIndex)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Block not found"));
                System.out.println("ii");
        page.getBlocks().remove(block);
        for(Block b : page.getBlocks()){
            if(b.getOrderIndex() > blockOrdexIndex) {
                b.setOrderIndex(b.getOrderIndex()-1);
            }
        }
        page.setUpdatedAt(Instant.now());
        return page.getBlocks().stream().map(this::toBlockResponse).toList();
    }

    public BlockResponse editBlock(Long pageId, UpdateBlockRequest request) {
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new IllegalArgumentException("Page not found"));

        int OrderIndex = request.orderIndex();

        Block block = page.getBlocks().stream()
                .filter(b -> b.getOrderIndex() == OrderIndex)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Block not found"));

        block.setType(request.type());
        block.setContent(request.content());
        block.setPage(page);

        Block saved = blockRepository.save(block);

        page.setUpdatedAt(Instant.now());
        return toBlockResponse(saved);
    }
    public List<BlockResponse> moveBlock(Long pageId, UpdateBlockRequest request, String direction) {
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new IllegalArgumentException("Page not found"));

        int OrderIndex = request.orderIndex();

        Block block = page.getBlocks().stream()
                .filter(b -> b.getOrderIndex() == OrderIndex)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Block not found"));
        
        page.setUpdatedAt(Instant.now());
        if(direction.equalsIgnoreCase("up") && block.getOrderIndex() > 0) {
            Block otherBlock = page.getBlocks().stream()
                .filter(b -> b.getOrderIndex() == OrderIndex - 1)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Other block not found"));
            swap(block, otherBlock);

            List<BlockResponse> updatedBlocks = page.getBlocks().stream()
                .sorted(Comparator.comparingInt(Block::getOrderIndex))
                .map(this::toBlockResponse)
                .toList();
                return updatedBlocks;
        } else if(direction.equalsIgnoreCase("down") && block.getOrderIndex() < page.getBlocks().size() - 1) {
            Block otherBlock = page.getBlocks().stream()
                .filter(b -> b.getOrderIndex() == OrderIndex + 1)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Other block not found"));

            swap(block, otherBlock);

            List<BlockResponse> updatedBlocks = page.getBlocks().stream()
                .sorted(Comparator.comparingInt(Block::getOrderIndex))
                .map(this::toBlockResponse)
                .toList();
                return updatedBlocks;
        }
        return page.getBlocks().stream()
                .map(this::toBlockResponse)
                .toList();
        
    }

    private void swap(Block a, Block b) {
    int temp = a.getOrderIndex();
    a.setOrderIndex(b.getOrderIndex());
    b.setOrderIndex(temp);
}
    // ===== MAPPER =====

    private BlockResponse toBlockResponse(Block block) {
        return new BlockResponse(
                block.getType().name(),
                block.getContent(),
                block.getOrderIndex()
        );
    }
}
// public class BlockService {

//     private final BlockRepository blockRepository;
//     private final PageRepository pageRepository;

//     public Block addBlock(Long pageId, BlockType type, String content) {
//         Page page = pageRepository.findById(pageId).orElseThrow(() -> new IllegalArgumentException("Page not found"));

//         int nextOrder = page.getBlocks().size();

//         Block block = new Block();
//         block.setType(type);
//         block.setContent(content);
//         block.setOrderIndex(nextOrder);
//         block.setPage(page);

//         return blockRepository.save(block);
//     }
// }
