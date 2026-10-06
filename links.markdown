---
layout: page
title: Links
permalink: /links/
---

Resources I've put together or find myself coming back to.

<!--
  Every link uses the same layout: a .link-card with a .link-card-media
  (an <img> or a <canvas>) on the left, and a .link-card-body on the right
  holding the title (first line) and the description.

  To add a link, copy one <a class="link-card"> block and swap in an image:
    <span class="link-card-media"><img src="/assets/images/your-image.png" alt=""></span>
-->
<div class="link-list">
  <a class="link-card" href="{{ '/links/venues/' | relative_url }}">
    <span class="link-card-media"><canvas class="warehouse-floor" aria-hidden="true"></canvas></span>
    <span class="link-card-body">
      <span class="link-card-title">Publishing venues</span>
      <span class="link-card-desc">Conferences and journals for multi-robot systems, path and motion planning, task allocation and warehouse robotics, ranked by acceptance rate, with upcoming submission deadlines.</span>
    </span>
  </a>
</div>

<script src="{{ '/assets/js/warehouse-floor.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
