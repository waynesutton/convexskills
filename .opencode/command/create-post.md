---
description: Create a new blog post with proper frontmatter
---

# /create-post

Creates a new blog post in `content/blog/` with validated frontmatter.

## Workflow

1. Ask for post details (title, description, tags)
2. Generate a URL-safe slug
3. Create the markdown file with frontmatter
4. Remind to run sync

## Required information

| Field | Description |
|-------|-------------|
| title | Post title |
| description | SEO description (under 160 chars) |
| tags | Array of topic tags |

## Optional information

| Field | Description |
|-------|-------------|
| image | Header/OG image path |
| featured | Show in featured section |
| excerpt | Short text for cards |
| authorName | Author display name |

## File template

```markdown
---
title: "{title}"
description: "{description}"
date: "{YYYY-MM-DD}"
slug: "{slug}"
published: true
tags: [{tags}]
---

{content}
```

## After creation

Run sync to publish:

```bash
npm run sync
```

## Validation

- Slug must be unique across all posts/pages
- Date must be YYYY-MM-DD format
- Tags must be an array
