# noth1ng-real.github.io

A minimal personal blog built with Jekyll, Minima, and GitHub Pages.

## First-time setup

Ruby and Bundler are required for local preview. Install the blog dependencies
once:

```sh
bin/blog setup
```

## Writing a post

Create a draft from the repository root:

```sh
bin/blog new "Post title"
```

This creates:

```text
_drafts/post-title.md
assets/images/post-title/
```

Open the repository as an Obsidian vault and edit the generated Markdown file.
Its front matter looks like this:

```yaml
---
title: "Post title"
excerpt: "A short description shown on the home page."
tags:
  - Security
  - Linux
featured: false
---
```

Use standard Markdown links and images rather than Obsidian-only `[[links]]`
or `![[embeds]]`. Reference an image with:

```markdown
![Useful description](/assets/images/post-title/example.png)
```

List unfinished work with:

```sh
bin/blog drafts
```

Preview published posts and drafts with live reload:

```sh
bin/blog preview
```

Then visit <http://127.0.0.1:4000>.

When the post has a title and excerpt, publish it with its slug:

```sh
bin/blog publish post-title
```

The command moves it to `_posts/YYYY-MM-DD-post-title.md` using the local
date. Review the changes with Git, then commit and push to deploy through
GitHub Pages. The blog command never commits or pushes automatically.

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
