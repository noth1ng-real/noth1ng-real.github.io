---
layout: page
title: Search
permalink: /search/
---

<div class="search" data-search data-index-url="{{ "/assets/search.json" | relative_url }}">
  <label class="search-label" for="search-input">Search posts</label>
  <div class="search-input-wrap">
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m21 21-4.4-4.4m2.4-5.1a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/>
    </svg>
    <input id="search-input" type="search" placeholder="Titles, topics, or keywords…" autocomplete="off" spellcheck="false">
    <kbd>/</kbd>
  </div>
  <p class="search-status" aria-live="polite">Start typing to search all posts.</p>
  <div class="search-results"></div>
</div>

<script src="{{ "/assets/search.js" | relative_url }}" defer></script>
