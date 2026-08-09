# noth1ng-real.github.io

A minimal personal blog built with Jekyll, Minima, and GitHub Pages.

## Writing a post

Add a Markdown file to `_posts` using the name `YYYY-MM-DD-title.md`:

```markdown
---
title: "Post title"
date: 2026-08-08
excerpt: "A short description shown on the home page."
tags:
  - Security
  - Linux
# featured: true
---

Write the post here.
```

Commit and push the file to publish it. Posts can be edited directly in
Obsidian; use standard Markdown links and images for Jekyll compatibility.

Add `featured: true` to highlight a specific post as your best work on the
homepage. Without it, the post appears only in Recent Posts and the Archive.

## Rich post elements

Add a captioned, expandable image with:

```html
<figure>
  <img src="/assets/images/my-post/example.png" alt="A useful description">
  <figcaption>A short caption.</figcaption>
</figure>
```

Callouts use this structure (replace `note` with `warning` or `tip`):

```html
<aside class="callout" data-callout="note" markdown="1">
<p class="callout-title">Note</p>

Markdown works inside this box.
</aside>
```

Tabs use matching `data-tab` and `data-tab-panel` names:

```html
<div class="tabs" data-tabs data-tabs-label="Operating system">
  <div class="tab-list" role="tablist">
    <button type="button" data-tab="linux">Linux</button>
    <button type="button" data-tab="windows">Windows</button>
  </div>
  <div class="tab-panel" data-tab-panel="linux" markdown="1">Linux instructions.</div>
  <div class="tab-panel" data-tab-panel="windows" markdown="1">Windows instructions.</div>
</div>
```
