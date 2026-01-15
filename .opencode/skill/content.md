---
description: Content management guide
---

# Content Management Guide

How to manage content in the markdown publishing framework.

## Content locations

| Type | Location | Purpose |
|------|----------|---------|
| Blog posts | `content/blog/*.md` | Time-based articles |
| Pages | `content/pages/*.md` | Static pages |
| Raw files | `public/raw/*.md` | Generated static copies |
| Images | `public/images/` | Static images |

## Creating content

### New blog post

1. Create file: `content/blog/my-post.md`
2. Add required frontmatter:
   ```yaml
   ---
   title: "My Post Title"
   description: "SEO description"
   date: "2025-01-15"
   slug: "my-post"
   published: true
   tags: ["topic"]
   ---
   ```
3. Write content in markdown
4. Run `npm run sync`
5. View at `localhost:5173/my-post`

### New page

1. Create file: `content/pages/my-page.md`
2. Add required frontmatter:
   ```yaml
   ---
   title: "My Page"
   slug: "my-page"
   published: true
   ---
   ```
3. Write content
4. Run `npm run sync`
5. View at `localhost:5173/my-page`

## Special pages

| Slug | Purpose |
|------|---------|
| `home-intro` | Homepage intro content |
| `footer` | Footer content |

These render in special locations. Set `showInNav: false` to hide from navigation.

## Content workflow

```
Write markdown --> npm run sync --> Convex DB --> Site
```

### Development

1. Edit markdown files
2. Run `npm run sync`
3. View changes at `localhost:5173`

### Production

1. Edit markdown files
2. Run `npm run sync:prod`
3. View changes on production site

## Images

### Local images

Place in `public/images/` and reference:

```markdown
![Alt text](/images/my-image.png)
```

### External images

Use full URLs:

```markdown
![Alt text](https://example.com/image.png)
```

### Image in frontmatter

```yaml
image: "/images/og-image.png"
showImageAtTop: true
```

## Markdown features

### Code blocks

````markdown
```typescript
const example = "code";
```
````

### Tables

```markdown
| Header | Header |
|--------|--------|
| Cell   | Cell   |
```

### Links

```markdown
[Link text](/internal-path)
[External](https://example.com)
```

### Headings

```markdown
# H1 (demoted to H2 in posts)
## H2
### H3
```

## Docs section

To add content to the docs sidebar:

```yaml
docsSection: true
docsSectionGroup: "Group Name"
docsSectionOrder: 1
```

## Unlisted content

To hide from listings but keep accessible:

```yaml
published: true
unlisted: true
```

## Draft content

To hide completely:

```yaml
published: false
```

## Import from URL

```bash
npm run import https://example.com/article
npm run sync
```

## Export from Dashboard

```bash
npm run export:db        # Dev
npm run export:db:prod   # Prod
```

Exports dashboard-created content to markdown files.

## Best practices

1. **Unique slugs** - Every post/page needs a unique slug
2. **SEO descriptions** - Keep under 160 characters
3. **Tags** - Use consistent tag names
4. **Images** - Optimize before uploading
5. **Sync after changes** - Always run sync
