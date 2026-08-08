---
layout: page
title: Archive
permalink: /archive/
---

<div class="archive">
  {% if site.tags.size > 0 %}
    <div class="archive-filter" aria-label="Filter posts by tag">
      <p>Filter by tag</p>
      <div class="archive-filter-list">
        <button class="is-active" type="button" data-tag-filter="all">All <span>{{ site.posts.size }}</span></button>
        {% assign sorted_tags = site.tags | sort %}
        {% for tag in sorted_tags %}
          <button type="button" data-tag-filter="{{ tag[0] | slugify }}">{{ tag[0] }} <span>{{ tag[1].size }}</span></button>
        {% endfor %}
      </div>
    </div>
  {% endif %}

  <p class="archive-filter-status" aria-live="polite"></p>

  {% for post in site.posts %}
    {% assign current_year = post.date | date: "%Y" %}
    {% if current_year != previous_year %}
      <h2 class="archive-year">{{ current_year }}</h2>
      {% assign previous_year = current_year %}
    {% endif %}
    <article class="archive-item" data-post-tags="{% for tag in post.tags %}{{ tag | slugify }}{% unless forloop.last %} {% endunless %}{% endfor %}">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d" }}</time>
      <div>
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
        {% if post.tags.size > 0 %}
          <span class="archive-item-tags">{{ post.tags | join: " · " }}</span>
        {% endif %}
      </div>
    </article>
  {% endfor %}
</div>

<script src="{{ "/assets/archive.js" | relative_url }}" defer></script>
