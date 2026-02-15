#!/bin/sh
filepath="$ZED_WORKTREE_ROOT/src/lib/posts/new_post.svx"
today=$(date +%F)

echo "---\ntitle: \"\"\ndate: \"$today\"\nsummary: \"\"\ntags: []\n---" > "$filepath"
zed "$filepath"
