

---
title: "Tag Cloud"
layout: "base.njk"
permalink: "/tags/"
---

<div class="max-w-4xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8 text-center">Explore Topics</h1>
  
  <!-- Basic Tag Cloud -->
  <div class="flex flex-wrap justify-center gap-4 mb-12">
    {% if collections.tagCloud.length > 0 %}
      {% set maxCount = collections.tagCloud[0].count %}
      {% for item in collections.tagCloud %}
        <a href="/tags/{{ item.tag | slug }}/" 
           class="inline-block font-medium transition-all duration-200 hover:scale-110 {{ item.count | tagSize(maxCount) }} {{ item.count | tagOpacity(maxCount) }} {{ item.tag | tagColor }}">
          {{ item.tag }}
          <span class="text-xs opacity-60 ml-1">({{ item.count }})</span>
        </a>
      {% endfor %}
    {% else %}
      <p class="text-gray-500">No tags found.</p>
    {% endif %}
  </div>

  <!-- Alternative: Bubble-style Tag Cloud -->
  <div class="flex flex-wrap justify-center gap-3 mb-12">
    {% if collections.tagCloud.length > 0 %}
      {% set maxCount = collections.tagCloud[0].count %}
      {% for item in collections.tagCloud %}
        <a href="/tags/{{ item.tag | slug }}/" 
           class="inline-block px-4 py-2 rounded-full border-2 font-medium transition-all duration-200 hover:scale-105 hover:shadow-md {{ item.count | tagSize(maxCount) }} {{ item.tag | tagColor }} border-current">
          {{ item.tag }}
          <span class="text-xs opacity-70 ml-1">{{ item.count }}</span>
        </a>
      {% endfor %}
    {% endif %}
  </div>

  <!-- Alternative: Card-style with counts -->
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
    {% for item in collections.tagCloud %}
      <a href="/tags/{{ item.tag | slug }}/" 
         class="block p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
        <div class="font-semibold text-gray-900 mb-1">{{ item.tag }}</div>
        <div class="text-sm text-gray-500">{{ item.count }} posts</div>
      </a>
    {% endfor %}
  </div>

  <!-- Alternative: Weighted list style -->
  <div class="space-y-2">
    {% if collections.tagCloud.length > 0 %}
      {% set maxCount = collections.tagCloud[0].count %}
      {% for item in collections.tagCloud %}
        <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
          <a href="/tags/{{ item.tag | slug }}/" 
             class="font-medium hover:underline {{ item.tag | tagColor }} {{ item.count | tagSize(maxCount) }}">
            {{ item.tag }}
          </a>
          <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {{ item.count }}
          </span>
        </div>
      {% endfor %}
    {% endif %}
  </div>

  <!-- Show most popular tags separately -->
  <div class="mt-12 pt-8 border-t border-gray-200">
    <h2 class="text-xl font-semibold mb-4">Most Popular Tags</h2>
    <div class="flex flex-wrap gap-2">
      {% for item in collections.tagCloud | first(10) %}
        <a href="/tags/{{ item.tag | slug }}/" 
           class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
          {{ item.tag }} ({{ item.count }})
        </a>
      {% endfor %}
    </div>
  </div>
</div>