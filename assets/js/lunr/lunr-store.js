---
layout: none
---

{% comment %}
This file is a port of minimal-mistakes/assets/js/lunr/lunr-store.js 
It has been modified to search site pages not site blogs
And a few other tweaks such as introducing a 'do_not_search' page property
{% endcomment %}
    
{%- assign docs = site.pages  -%}
    
var store = [
    {%- for doc in docs -%}
    
     {%- if forloop.last -%}
      {%- assign l = true -%}
    {%- endif -%}
    
      {%- if doc.header.teaser -%}
        {%- capture teaser -%}{{ doc.header.teaser }}{%- endcapture -%}
      {%- else -%}
        {%- assign teaser = site.teaser -%}
      {%- endif -%}
      {%- if doc.title -%}
      {%- unless doc.do_not_search -%}
      {
        "title": {{ doc.title | jsonify }},
        "excerpt":
          {%- if site.search_full_content == true -%}
            {{ doc.content | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
              replace:"##", "" |
            strip_html | strip_newlines | jsonify }},
          {%- else -%}
            {{ doc.content | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
              replace:"##", "" |
            strip_html | strip_newlines | truncatewords: 50 | jsonify }},
          {%- endif -%}
        "categories": {{ doc.categories | jsonify }},
        "tags": {{ doc.tags | jsonify }},
        "url": {{ doc.url | relative_url | jsonify }},
        "teaser": {{ teaser | relative_url | jsonify }}
       }{%- unless forloop.last and l -%},{%- endunless -%}
     {%- endunless -%}
    {%- endif -%}
    {%- endfor -%}
  
  ]
