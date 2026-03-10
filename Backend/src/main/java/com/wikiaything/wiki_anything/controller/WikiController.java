package com.wikiaything.wiki_anything.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.wikiaything.wiki_anything.DTO.CreateWikiRequest;
import com.wikiaything.wiki_anything.DTO.WikiResponse;
import com.wikiaything.wiki_anything.service.WikiService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/wiki")
@RequiredArgsConstructor
public class WikiController {

    private final WikiService WikiService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WikiResponse createWiki(@RequestBody CreateWikiRequest request) {
        return WikiService.createWiki(request);
    }

    @GetMapping("/{slug}")
    public WikiResponse getWiki(@PathVariable String slug) {
        System.out.println("Fetching page with slug: " + slug);
        return WikiService.getWikiResponseBySlug(slug);
    }
    @GetMapping("/")
    public List<WikiResponse> getWikis() {
        return WikiService.getAllWikis();
    }
    @DeleteMapping("/{slug}")
    public WikiResponse deleteWiki(@PathVariable String slug) {
        return WikiService.deleteWiki(slug);
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

