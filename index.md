---
layout: default
title: "首页"
---

# 🧠 Walking Typhoon Blog

欢迎来到我的理工科风格博客！

---

{% for post in site.posts %}
### [{{ post.title }}]({{ post.url | relative_url }})
<small>{{ post.date | date: "%Y-%m-%d" }}</small>
{{ post.excerpt }}
---

{% endfor %}