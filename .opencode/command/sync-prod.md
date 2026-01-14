---
description: Sync markdown content to production Convex database
---

# /sync-prod

Syncs all markdown content to the production Convex database.

## What it does

Same as `/sync` but targets the production environment using `.env.production.local`.

## Usage

```bash
npm run sync:prod
```

## Requirements

- `.env.production.local` file must exist with `VITE_CONVEX_URL`
- Production Convex deployment must be configured

## When to use

- Before deploying changes to production
- When updating live content
- As part of the deployment workflow

## Full production sync

To sync everything including discovery files:

```bash
npm run sync:all:prod
```

## Verification

After production sync:

1. Check your production site
2. Verify content appears correctly
3. Check Convex dashboard for the production deployment
