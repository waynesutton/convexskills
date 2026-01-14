---
description: Import external URL content as a markdown post
---

# /import

Imports content from an external URL and creates a new blog post.

## Usage

```bash
npm run import https://example.com/article
```

## Requirements

- `FIRECRAWL_API_KEY` in `.env.local`
- Valid, accessible URL

## What it does

1. Fetches the URL via Firecrawl API
2. Converts HTML to clean markdown
3. Extracts metadata (title, description)
4. Generates frontmatter
5. Creates file in `content/blog/`

## After import

You still need to run sync:

```bash
npm run sync
```

## Editing imported content

After import, you can edit the generated file in `content/blog/` to:

- Adjust the title
- Update the description
- Add/remove tags
- Edit the content
- Add images

## Troubleshooting

### "FIRECRAWL_API_KEY not set"

Add to your `.env.local`:

```
FIRECRAWL_API_KEY=your_api_key_here
```

### Content looks wrong

Some sites may not convert cleanly. Edit the generated markdown manually.

### Import failed

Check if the URL is accessible and not blocked by robots.txt or authentication.
