#!/bin/bash

echo "==== Generating Category Pages (local build) ===="

CATEGORIES_DIR="categories"
POSTS_DIR="_posts"

rm -rf "$CATEGORIES_DIR"
mkdir -p "$CATEGORIES_DIR"

ALL_CATEGORIES=$(grep -R "^categories:" -n "$POSTS_DIR" \
  | sed 's/.*\[//; s/\].*//; s/,/ /g' \
  | tr ' ' '\n' \
  | sort -u)

for category in $ALL_CATEGORIES; do
    mkdir -p "$CATEGORIES_DIR/$category"

    cat > "$CATEGORIES_DIR/$category/index.html" <<EOF
---
layout: category
category: $category
permalink: /categories/$category/
---

<h1>分类：$category</h1>
<p>以下是属于该分类的文章：</p>
EOF
    echo "Generated category: $category"
done

echo "==== Category Generation Completed ===="