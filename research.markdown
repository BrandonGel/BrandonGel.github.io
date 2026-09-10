---
layout: page
title: Research
permalink: /research/
---

{% assign date_format = site.lin.date_format | default: "%b %-d, %Y" %}
{% for post in site.categories.research %}
<div class="lin-card is-flat has-space-bottom">
  <span class="post-meta">{{ post.date | date: date_format }}</span>
  <h3>
    <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
  </h3>
</div>
{% endfor %}
