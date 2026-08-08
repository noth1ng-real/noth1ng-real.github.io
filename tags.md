---
layout: page
title: Tags
permalink: /tags/
---

{% if site.tags.size > 0 %}
  <div class="tag-cloud" aria-label="All tags">
    {% assign sorted_tags = site.tags | sort %}
    {% for tag in sorted_tags %}
      <a href="#{{ tag[0] | slugify }}">{{ tag[0] }} <span>{{ tag[1].size }}</span></a>
    {% endfor %}
  </div>

  <div class="tag-groups">
    {% for tag in sorted_tags %}
      <section class="tag-group" id="{{ tag[0] | slugify }}">
        <h2>{{ tag[0] }}</h2>
        {% for post in tag[1] %}
          <article class="tag-post">
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>
            <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
          </article>
        {% endfor %}
      </section>
    {% endfor %}
  </div>
{% else %}
  <p class="empty-state">Tags will appear here after you add them to a post.</p>
{% endif %}
