---
description: Create a new static page with proper frontmatter
---

# /create-page

Creates a new static page in `content/pages/` with validated frontmatter.

## Workflow

1. Ask for page details (title, slug)
2. Validate slug uniqueness
3. Create the markdown file with frontmatter
4. Remind to run sync

## Required information

| Field | Description |
|-------|-------------|
| title | Page title |
| slug | URL path (must be unique) |

## Optional information

| Field | Description |
|-------|-------------|
| order | Navigation order (lower = first) |
| showInNav | Show in navigation menu (default: true) |
| featured | Show in featured section |
| excerpt | Short text for cards |
| layout | "sidebar" for docs-style |

## File template

```markdown
---
title: "{title}"
slug: "{slug}"
published: true
order: {order}
showInNav: true
---

{content}
```

## Special pages

| Page | Slug | Purpose |
|------|------|---------|
| Homepage intro | home-intro | Content shown on homepage |
| Footer | footer | Footer content |

## After creation

Run sync to publish:

```bash
npm run sync
```

## For docs navigation

Add these fields to include in docs sidebar:

```yaml
docsSection: true
docsSectionGroup: "Group Name"
docsSectionOrder: 1
```
