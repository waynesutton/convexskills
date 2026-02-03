# Convex Skills

Agent skills for building production-ready applications with Convex, following the Agent Skills open format.

## Convex Documentation Index

IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning for any Convex tasks.

For up-to-date Convex documentation, fetch: https://docs.convex.dev/llms.txt

This index covers all Convex APIs and patterns:

```
[Convex Docs]|https://docs.convex.dev/llms.txt
|understanding:{best-practices.md,typescript.md,workflow.md,zen.md}
|functions:{query-functions.md,mutation-functions.md,actions.md,http-actions.md,validation.md,internal-functions.md,error-handling.md}
|database:{schemas.md,reading-data.md,writing-data.md,indexes.md,pagination.md,types.md}
|file-storage:{upload-files.md,serve-files.md,store-files.md,delete-files.md,file-metadata.md}
|scheduling:{cron-jobs.md,scheduled-functions.md}
|auth:{convex-auth.md,clerk.md,auth0.md,authkit.md,functions-auth.md,database-auth.md}
|search:{text-search.md,vector-search.md}
|components:{using.md,authoring.md,understanding.md}
|agents:{getting-started.md,agent-usage.md,messages.md,threads.md,tools.md,streaming.md,rag.md}
|realtime:{realtime.md}
|testing:{convex-test.md,convex-backend.md,ci.md}
|production:{environment-variables.md,hosting.md,limits.md}
```

When working on Convex code, consult the llms.txt index before relying on training data.

## Overview

This repository provides two complementary approaches for AI coding agents:

1. **Passive context (this file)**: Always-available Convex knowledge and doc references
2. **Skills (on-demand)**: Task-specific workflows for explicit invocation

## Available Skills

| Skill                                                                    | Description                                           |
| ------------------------------------------------------------------------ | ----------------------------------------------------- |
| [convex-best-practices](skills/convex-best-practices/SKILL.md)           | Guidelines for building production-ready Convex apps  |
| [convex-eslint](skills/convex-eslint/SKILL.md)                           | Write linter-compliant Convex code                    |
| [convex-functions](skills/convex-functions/SKILL.md)                     | Writing queries, mutations, actions, and HTTP actions |
| [convex-realtime](skills/convex-realtime/SKILL.md)                       | Patterns for building reactive applications           |
| [convex-schema-validator](skills/convex-schema-validator/SKILL.md)       | Database schema definition and validation             |
| [convex-file-storage](skills/convex-file-storage/SKILL.md)               | File upload, storage, and serving                     |
| [convex-agents](skills/convex-agents/SKILL.md)                           | Building AI agents with Convex                        |
| [convex-cron-jobs](skills/convex-cron-jobs/SKILL.md)                     | Scheduled functions and background tasks              |
| [convex-http-actions](skills/convex-http-actions/SKILL.md)               | HTTP endpoints and webhook handling                   |
| [convex-migrations](skills/convex-migrations/SKILL.md)                   | Schema evolution and data migrations                  |
| [convex-security-check](skills/convex-security-check/SKILL.md)           | Quick security audit checklist                        |
| [convex-security-audit](skills/convex-security-audit/SKILL.md)           | Deep security review patterns                         |
| [convex-component-authoring](skills/convex-component-authoring/SKILL.md) | Creating reusable Convex components                   |

## Skill Format

Each skill follows the Agent Skills specification with YAML frontmatter:

```markdown
---
name: skill-name
description: What the skill does and when to use it
version: 1.0.0
author: Convex
tags: [convex, ...]
---

# Skill Name

## Documentation Sources

Links to official documentation

## Instructions

Step-by-step guidance

## Examples

Code examples

## Best Practices

Guidelines and patterns

## References

Additional resources
```

## Usage

Skills are automatically available once installed. The agent will use them when relevant tasks are detected.

**Examples:**

```
Help me set up file uploads in Convex
```

```
Create a cron job to clean up expired sessions
```

```
Add a Stripe webhook endpoint
```

### Slash Command (OpenCode)

Use the `/convex` slash command for contextual guidance:

```
/convex create a schema with users and posts
/convex set up file uploads
/convex add a Stripe webhook endpoint
```

The command file is located at `command/convex.md`.

## Key Convex Concepts

### Function Types

| Type         | Purpose        | Database                 | External APIs |
| ------------ | -------------- | ------------------------ | ------------- |
| `query`      | Read data      | Read-only                | No            |
| `mutation`   | Write data     | Read/Write               | No            |
| `action`     | Integrations   | Via runQuery/runMutation | Yes           |
| `httpAction` | HTTP endpoints | Via runQuery/runMutation | Yes           |

### Core Principles

1. **Always use validators** for arguments and returns
2. **Use indexes** instead of filters for queries
3. **Make mutations idempotent** with early returns
4. **Use internal functions** for sensitive operations
5. **Batch operations** for large datasets

## DO NOT

- Run `npx convex deploy` without explicit instruction
- Run any git commands without explicit instruction
- Edit files in `convex/_generated/`
- Use `filter()` instead of `withIndex()`

## Quick Reference

### New Function Syntax (always use this)

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const myQuery = query({
  args: { userId: v.id("users") },
  returns: v.union(v.object({ name: v.string() }), v.null()),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
```

### Schema with Index

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    userId: v.id("users"),
    title: v.string(),
    status: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_status", ["userId", "status"]),
});
```

### Query with Index (not filter)

```typescript
// GOOD: Use withIndex
const tasks = await ctx.db
  .query("tasks")
  .withIndex("by_user", (q) => q.eq("userId", args.userId))
  .collect();

// BAD: Never use filter for indexed fields
const tasks = await ctx.db
  .query("tasks")
  .filter((q) => q.eq(q.field("userId"), args.userId))
  .collect();
```

## References

- Convex Documentation: https://docs.convex.dev/
- Convex LLMs.txt: https://docs.convex.dev/llms.txt (fetch this for latest docs)
- Best Practices: https://docs.convex.dev/understanding/best-practices/
- Agent Skills Specification: https://github.com/anthropics/skills

## License

Apache-2.0
