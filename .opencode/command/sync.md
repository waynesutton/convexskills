---
description: Sync markdown content to development Convex database
---

# /sync

Syncs all markdown content from `content/blog/` and `content/pages/` to the development Convex database.

## What it does

1. Reads all `.md` files from content directories
2. Parses frontmatter with gray-matter
3. Validates required fields
4. Calculates reading time if not provided
5. Upserts content to Convex database
6. Generates raw markdown files in `public/raw/`

## Usage

```bash
npm run sync
```

## When to use

- After creating or editing markdown files
- After importing content from URLs
- When content is not appearing on the site

## Output

The command shows:
- Number of posts synced
- Number of pages synced
- Any validation warnings
- Generated raw files

## Next steps

After syncing, visit `http://localhost:5173` to see your content.

For production sync, use `/sync-prod` instead.
