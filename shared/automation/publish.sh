#!/bin/bash
# Blog Publish Script
# Usage: ./publish.sh <draft-filename>

DRAFT="$1"
if [ -z "$DRAFT" ]; then
    echo "Usage: ./publish.sh <draft-filename>"
    exit 1
fi

BLOG_DIR="/workspace/evansbots/shared/blog_drafts"
WEBSITE_DIR="/workspace/evansbots/hpo-ai-executive"  # adjust to your website repo

echo "📝 Reading draft: $DRAFT"
CONTENT=$(cat "$BLOG_DIR/$DRAFT")

# Extract title from first heading
TITLE=$(echo "$CONTENT" | grep "^# " | head -1 | sed 's/^# //')

echo "📌 Title: $TITLE"

# Copy to website (adjust path for your setup)
# cp "$BLOG_DIR/$DRAFT" "$WEBSITE_DIR/content/blog/"

echo "✅ Draft prepared: $DRAFT"
echo ""
echo "Next steps:"
echo "1. Push to GitHub (Netlify will auto-deploy)"
echo "2. Share to LinkedIn/Twitter"
