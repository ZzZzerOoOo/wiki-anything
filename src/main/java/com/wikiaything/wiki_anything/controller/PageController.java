package com.wikiaything.wiki_anything.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.wikiaything.wiki_anything.DTO.CreatePageRequest;
import com.wikiaything.wiki_anything.DTO.PageResponse;
import com.wikiaything.wiki_anything.service.PageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/pages")
@RequiredArgsConstructor
public class PageController {

    private final PageService pageService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PageResponse createPage(@RequestBody CreatePageRequest request) {
        return pageService.createPage(request);
    }

    @GetMapping("/{slug}")
    public PageResponse getPage(@PathVariable String slug) {
        System.out.println("Fetching page with slug: " + slug);
        return pageService.getPageResponseBySlug(slug);
    }
}

// @RestController
// @RequestMapping("/pages")
// @RequiredArgsConstructor
// public class PageController {

//     private final PageService pageService;

//     @PostMapping
//     @ResponseStatus(HttpStatus.CREATED)
//     public Page createPage(@RequestParam String title) {
//         return pageService.createPage(title);
//     }

//     @GetMapping("/{slug}")
//     public Page getPage(@PathVariable String slug) {
//         return pageService.getPageBySlug(slug);
//     }
// }

