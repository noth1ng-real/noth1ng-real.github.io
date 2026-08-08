---
layout: page
title: Archive
permalink: /archive/
---

<div class="archive">
  {% for post in site.posts %}
    {% assign current_year = post.date | date: "%Y" %}
    {% if current_year != previous_year %}
      <h2>{{ current_year }}</h2>
      {% assign previous_year = current_year %}
    {% endif %}
    <article class="archive-item">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d" }}</time>
      <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    </article>
  {% endfor %}
</div>
