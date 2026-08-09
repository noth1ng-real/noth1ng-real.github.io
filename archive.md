---
layout: page
title: Archive
permalink: /archive/
---

<div class="archive">
  <div class="archive-layout">
    <div class="archive-posts">
      <p class="archive-filter-status" aria-live="polite"></p>

      {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
      {% for year in posts_by_year %}
        <section class="archive-year-group">
          <h2 class="archive-year">{{ year.name }}</h2>
          {% for post in year.items %}
            <article class="archive-item" data-post-tags="{% for tag in post.tags %}{{ tag | slugify }}{% unless forloop.last %}|{% endunless %}{% endfor %}">
              <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d" }}</time>
              <div>
                <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
                {% if post.tags.size > 0 %}
                  <span class="archive-item-tags">{{ post.tags | join: " · " }}</span>
                {% endif %}
              </div>
            </article>
          {% endfor %}
        </section>
      {% endfor %}
    </div>

    {% if site.tags.size > 0 %}
      <aside class="archive-filter" aria-label="Filter posts by tag">
        <p>Filter by tag</p>
        <div class="archive-filter-list">
          <button class="is-active" type="button" data-tag-filter="all" data-tag-label="All">All <span>{{ site.posts.size }}</span></button>
          {% assign sorted_tags = site.tags | sort %}
          {% for tag in sorted_tags %}
            <button type="button" data-tag-filter="{{ tag[0] | slugify }}" data-tag-label="{{ tag[0] | escape }}">{{ tag[0] }} <span>{{ tag[1].size }}</span></button>
          {% endfor %}
        </div>
      </aside>
    {% endif %}
  </div>
</div>

<script src="{{ "/assets/archive.js" | relative_url }}?v={{ site.time | date: "%s" }}" defer></script>
