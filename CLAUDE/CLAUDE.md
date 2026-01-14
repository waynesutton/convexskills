# Project Context

[Project Name] - [Brief description of what this project does]

Built with: Convex (backend), [React/Next.js/Vue/etc.] (frontend)

## Bash Commands

```bash
# Development
npx convex dev              # Start dev server (watches files, syncs to cloud)
npx convex dev --once       # Single sync without watching
npx convex dev --local      # Local development (no cloud)

# Deployment
npx convex deploy           # Deploy to production
npx convex deploy --cmd "npm run build"  # Deploy with frontend build

# Running Functions
npx convex run messages:send '{"body": "hello"}'  # Run with args
npx convex run myQuery --watch                     # Watch query results

# Data Management
npx convex data                          # List tables
npx convex data messages --limit 50      # View table data
npx convex import --table tableName path/to/data.json
npx convex export --path ./backup

# Environment Variables
npx convex env list
npx convex env set API_KEY "secret123"

# Utilities
npx convex dashboard        # Open dashboard
npx convex logs             # View logs
npx convex codegen          # Regenerate types
```

## File Structure

```
convex/
├── _generated/           # Auto-generated (DO NOT EDIT, commit to git)
│   ├── api.d.ts         # API types
│   ├── dataModel.d.ts   # Database types (Doc<>, Id<>)
│   └── server.d.ts      # Server types
├── schema.ts            # Database schema definition (required)
├── http.ts              # HTTP actions router (exact name required)
├── crons.ts             # Cron job definitions
├── auth.config.ts       # Auth configuration
└── [feature].ts         # Functions → api.[feature].*
```

## Code Style

### Function Types - Use the Right One

```typescript
// QUERY: Read-only, reactive, cached. Use for fetching data.
export const list = query({
  args: { limit: v.optional(v.number()) },
  returns: v.array(v.object({ /* ... */ })),
  handler: async (ctx, args) => {
    return await ctx.db.query("items").take(args.limit ?? 10);
  },
});

// MUTATION: Write operations. Transactional, atomic.
export const create = mutation({
  args: { text: v.string() },
  returns: v.id("items"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("items", { text: args.text });
  },
});

// ACTION: External API calls. NOT auto-retried, NOT transactional.
export const processExternal = action({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    const data = await ctx.runQuery(internal.items.get, { id: args.id });
    const result = await fetch("https://api.example.com", { /* ... */ });
    await ctx.runMutation(internal.items.saveResult, { /* ... */ });
  },
});
```

### Schema Patterns

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("user")),
    profileId: v.optional(v.id("profiles")),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  posts: defineTable({
    authorId: v.id("users"),
    title: v.string(),
    status: v.union(v.literal("draft"), v.literal("published")),
    tags: v.array(v.string()),
  })
    .index("by_author", ["authorId"])
    .index("by_author_status", ["authorId", "status"]),
});
```

### Validator Reference

```typescript
// Primitives
v.string()              v.number()              v.boolean()
v.int64()               v.bytes()               v.null()

// Complex
v.id("tableName")       v.array(v.string())     v.object({ key: v.string() })
v.record(v.string(), v.number())

// Modifiers
v.optional(v.string())  // Field may be missing
v.nullable(v.string())  // Shorthand for v.union(v.string(), v.null())
v.union(v.literal("a"), v.literal("b"))  // Enum-like
v.any()                 // Escape hatch
```

### Index Queries - ALWAYS use for large tables

```typescript
// ✅ GOOD: Uses index
const posts = await ctx.db
  .query("posts")
  .withIndex("by_author", (q) => q.eq("authorId", userId))
  .collect();

// ❌ BAD: Full table scan on large tables
const posts = await ctx.db
  .query("posts")
  .filter((q) => q.eq(q.field("authorId"), userId))
  .collect();
```

### Authentication Pattern

```typescript
export const myMutation = mutation({
  args: { /* ... */ },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");
    // identity.tokenIdentifier is the unique user ID
  },
});
```

### Scheduling Pattern

```typescript
// Schedule for later - ALWAYS use internal functions
await ctx.scheduler.runAfter(5000, internal.messages.process, { id });
await ctx.scheduler.runAt(timestamp, internal.tasks.execute, { id });

// Cron jobs (convex/crons.ts)
const crons = cronJobs();
crons.interval("cleanup", { minutes: 5 }, internal.tasks.cleanup);
crons.daily("digest", { hourUTC: 9, minuteUTC: 0 }, internal.emails.send);
export default crons;
```

### File Storage Pattern

```typescript
// Generate upload URL (mutation)
export const generateUploadUrl = mutation({
  handler: async (ctx) => await ctx.storage.generateUploadUrl(),
});

// Get file URL (query)
export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => await ctx.storage.getUrl(storageId),
});
```

## IMPORTANT Rules

1. **ALWAYS validate arguments** on public functions with `v` validators
2. **ALWAYS check authentication** before sensitive operations
3. **ALWAYS use `.withIndex()` on large tables** (1000+ docs), not `.filter()`
4. **ALWAYS await promises** - unawaited promises fail silently
5. **ALWAYS use `internal.` for scheduled functions**, never `api.`
6. **NEVER call external APIs from queries/mutations** - use actions
7. **NEVER use `undefined` as a value** - use `null` instead
8. **NEVER store relationships in arrays** - use separate tables with IDs
9. **PREFER queries/mutations over actions** - actions aren't cached or retried

## Common Gotchas

- `undefined` patches REMOVE the field: `ctx.db.patch(id, { field: undefined })`
- Query returns `undefined` while loading - use this for loading states
- Actions are NOT automatically retried on failure
- `_creationTime` is auto-appended to all indexes
- Max 8192 array elements, 1MB doc size, 16 nesting levels
- Circular imports cause undefined validators - watch for import cycles
- System tables: `_storage`, `_scheduled_functions` (query via `ctx.db.system`)

## Testing

```bash
npm run test               # Run all tests
npx convex dev --local     # Use local backend for testing
```

Prefer testing with real Convex backend over mocks when possible.

## Project-Specific Notes

[Add any project-specific conventions, business logic notes, or architecture decisions here]

## Quick Reference

### Function Type Decision Tree

```
Need to read data? → query()
Need to write data? → mutation()
Need external API? → action()
Server-only function? → internal*()
HTTP webhook/API? → httpAction()
```

### Validator Cheat Sheet

```typescript
v.string()                    // string
v.number()                    // number (float64)
v.boolean()                   // boolean
v.id("table")                 // Id<"table">
v.null()                      // null
v.optional(v.string())        // string | undefined (field can be missing)
v.nullable(v.string())        // string | null (field must exist)
v.array(v.string())           // string[]
v.object({ k: v.string() })   // { k: string }
v.union(v.literal("a"), v.literal("b"))  // "a" | "b"
v.record(v.string(), v.number())  // { [key: string]: number }
```

### Import Patterns

```typescript
// Function constructors
import { query, mutation, action, internalQuery, internalMutation, internalAction } from "./_generated/server";

// API references
import { api, internal } from "./_generated/api";

// Types
import { Doc, Id } from "./_generated/dataModel";

// Validators
import { v } from "convex/values";

// HTTP router
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

// Components
import { components } from "./_generated/api";
```
