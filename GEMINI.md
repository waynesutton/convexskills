# Convex Development Context

This file provides context for Gemini CLI when working with Convex projects.

## Project Type

Convex real-time backend application with TypeScript.

## Key Technologies

- **Convex** - Serverless database and functions platform
- **TypeScript** - Type-safe JavaScript
- **React** - Frontend framework (typical Convex frontend)

## Convex-Specific Guidelines

### Function Types

| Type | Purpose | Database Access | External APIs |
|------|---------|-----------------|---------------|
| `query` | Read data | Read-only | No |
| `mutation` | Modify data | Read/Write | No |
| `action` | External integrations | Via runQuery/runMutation | Yes |
| `httpAction` | Webhooks/APIs | Via runQuery/runMutation | Yes |

### Best Practices

1. **Always use validators** for args and returns
2. **Use indexes** instead of filters for queries
3. **Make mutations idempotent** for write conflict handling
4. **Use internal functions** for sensitive operations

### Commands

```bash
# Start development
npx convex dev

# Generate types
npx convex codegen

# View logs
npx convex logs

# Open dashboard
npx convex dashboard
```

### Do NOT Run Without Instruction

- `npx convex deploy` - Production deployment
- Any git commands

## Schema Reference

Schema is defined in `convex/schema.ts`:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Tables defined here
});
```

## Available Functions

Functions are in the `convex/` directory:
- Queries: Read-only data access
- Mutations: Data modifications
- Actions: External API calls

## Documentation

- Convex Docs: https://docs.convex.dev/
- LLMs.txt: https://docs.convex.dev/llms.txt
- Convex Skills: https://github.com/get-convex/convex-skills

## Error Handling

Use `ConvexError` for user-facing errors:

```typescript
import { ConvexError } from "convex/values";

throw new ConvexError({
  code: "NOT_FOUND",
  message: "Resource not found"
});
```

## File Structure

```
project/
├── convex/
│   ├── _generated/     # Auto-generated (don't edit)
│   ├── schema.ts       # Database schema
│   └── *.ts           # Function files
├── src/               # Frontend code
└── package.json
```
