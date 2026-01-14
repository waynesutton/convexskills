# Convex Skills

Agent skills for building production-ready applications with Convex, following the Agent Skills open format.

See [AGENTS.md](AGENTS.md) for detailed agent instructions.

## Available Skills

| Skill | Description |
|-------|-------------|
| [convex-best-practices](skills/convex-best-practices/SKILL.md) | Guidelines for building production-ready Convex apps |
| [convex-functions](skills/convex-functions/SKILL.md) | Writing queries, mutations, actions, and HTTP actions |
| [convex-realtime](skills/convex-realtime/SKILL.md) | Patterns for building reactive applications |
| [convex-schema-validator](skills/convex-schema-validator/SKILL.md) | Database schema definition and validation |
| [convex-file-storage](skills/convex-file-storage/SKILL.md) | File upload, storage, and serving |
| [convex-agents](skills/convex-agents/SKILL.md) | Building AI agents with Convex |
| [convex-cron-jobs](skills/convex-cron-jobs/SKILL.md) | Scheduled functions and background tasks |
| [convex-http-actions](skills/convex-http-actions/SKILL.md) | HTTP endpoints and webhook handling |
| [convex-migrations](skills/convex-migrations/SKILL.md) | Schema evolution and data migrations |
| [convex-security-check](skills/convex-security-check/SKILL.md) | Quick security audit checklist |
| [convex-security-audit](skills/convex-security-audit/SKILL.md) | Deep security review patterns |
| [convex-component-authoring](skills/convex-component-authoring/SKILL.md) | Creating reusable Convex components |

## Key Convex Concepts

### Function Types

| Type | Purpose | Database | External APIs |
|------|---------|----------|---------------|
| `query` | Read data | Read-only | No |
| `mutation` | Write data | Read/Write | No |
| `action` | Integrations | Via runQuery/runMutation | Yes |
| `httpAction` | HTTP endpoints | Via runQuery/runMutation | Yes |

### Core Principles

1. **Always use validators** for arguments and returns
2. **Use indexes** instead of filters for queries
3. **Make mutations idempotent** with early returns
4. **Use internal functions** for sensitive operations
5. **Batch operations** for large datasets

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

## DO NOT

- Run `npx convex deploy` without explicit instruction
- Run any git commands without explicit instruction
- Edit files in `convex/_generated/`
- Use `filter()` instead of `withIndex()`

## Documentation

- Convex Docs: https://docs.convex.dev/
- LLMs.txt: https://docs.convex.dev/llms.txt
- Best Practices: https://docs.convex.dev/understanding/best-practices/

## License

Apache-2.0
