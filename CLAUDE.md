# Convex Project

This project uses [Convex](https://convex.dev) as its backend platform.

## Project Structure

```
convex/           # Convex backend directory
├── _generated/   # Auto-generated (DO NOT EDIT)
├── schema.ts     # Database schema definition
└── *.ts         # Function files (queries, mutations, actions)
src/              # Frontend code
```

## Key Technologies

- **Convex** - Real-time database and serverless functions
- **TypeScript** - Type-safe development
- **React** - Frontend framework (if applicable)

## Convex Guidelines

### Function Types

| Type | Purpose | Database | External APIs |
|------|---------|----------|---------------|
| `query` | Read data | Read-only | No |
| `mutation` | Write data | Read/Write | No |
| `action` | Integrations | Via runQuery/runMutation | Yes |

### Best Practices

1. **Always use validators** for arguments and returns
2. **Use indexes** instead of filters
3. **Make mutations idempotent**
4. **Use internal functions** for sensitive operations

### Code Pattern

```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const myQuery = query({
  args: { id: v.id("tableName") },
  returns: v.object({ /* ... */ }),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
```

## Commands

```bash
# Start development
npx convex dev

# Open dashboard
npx convex dashboard

# View logs
npx convex logs

# Generate types
npx convex codegen
```

## DO NOT

- Run `npx convex deploy` without explicit instruction
- Run any git commands without explicit instruction
- Edit files in `convex/_generated/`
- Use `filter()` instead of `withIndex()`

## Schema

<!-- Schema will be auto-populated if using npx convex claude-init -->

Tables defined in `convex/schema.ts`:
- Check schema.ts for current table definitions

## Functions

<!-- Functions will be auto-populated if using npx convex claude-init -->

Available functions in `convex/`:
- Check convex/ directory for current functions

## Documentation

- Convex Docs: https://docs.convex.dev/
- LLMs.txt: https://docs.convex.dev/llms.txt
- Best Practices: https://docs.convex.dev/understanding/best-practices/

## Team Recommendation

Consider implementing `npx convex claude-init` to auto-generate this file with:
- Actual table names from schema introspection
- Function signatures from convex/ directory
- Configured components
- Environment variable placeholders

Convex has schema introspection capabilities that could populate this template automatically.
