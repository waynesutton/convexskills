# /convex

Convex platform reference for AI/LLM consumption. Load this skill for contextual guidance when building with Convex.

## Usage

```
/convex create a schema with users and posts
/convex set up file uploads
/convex add a cron job to clean up expired sessions
/convex build an AI agent with tools
/convex add a Stripe webhook endpoint
/convex run a security audit
/convex --update-skill
```

## Quick Reference

### Function Types

| Type | Database | External APIs | Use Case |
|------|----------|---------------|----------|
| `query` | Read-only | No | Fetching data (reactive, cached) |
| `mutation` | Read/Write | No | Modifying data (transactional) |
| `action` | Via runQuery/runMutation | Yes | External integrations |
| `httpAction` | Via runQuery/runMutation | Yes | Webhooks, REST APIs |

### Core Principles

1. **Always use validators** for args and returns
2. **Use indexes** instead of filters for queries
3. **Make mutations idempotent** with early returns
4. **Use internal functions** for sensitive operations
5. **Batch operations** for large datasets

## Decision Trees

### What are you building?

```
Need to store/query data?
├── Define schema → load convex-schema-validator
├── Write functions → load convex-functions
└── Build reactive UI → load convex-realtime

Need external integrations?
├── Webhooks/REST API → load convex-http-actions
├── Scheduled tasks → load convex-cron-jobs
└── File handling → load convex-file-storage

Building AI features?
├── AI agents with tools → load convex-agents
├── Vector search/RAG → load convex-agents
└── LLM integrations → load convex-agents

Need to review code?
├── Quick security check → load convex-security-check
├── Deep security audit → load convex-security-audit
└── Best practices review → load convex-best-practices

Maintaining existing code?
├── Schema changes → load convex-migrations
├── Component creation → load convex-component-authoring
└── General improvements → load convex-best-practices
```

### Database Operations

```
Working with data?
├── Schema definition
│   └── → convex-schema-validator
│       - defineSchema, defineTable
│       - Validators (v.string(), v.id(), etc.)
│       - Indexes for efficient queries
│
├── Reading data
│   └── → convex-functions (queries section)
│       - ctx.db.get(id)
│       - ctx.db.query("table").withIndex()
│       - .collect(), .first(), .unique()
│
├── Writing data
│   └── → convex-functions (mutations section)
│       - ctx.db.insert()
│       - ctx.db.patch()
│       - ctx.db.replace()
│       - ctx.db.delete()
│
└── Real-time subscriptions
    └── → convex-realtime
        - useQuery() hooks
        - Optimistic updates
```

### External Integrations

```
Integrating external services?
├── Webhooks (Stripe, Clerk, etc.)
│   └── → convex-http-actions
│       - httpRouter()
│       - Signature verification
│       - Response handling
│
├── REST API endpoints
│   └── → convex-http-actions
│       - Path parameters
│       - CORS handling
│       - Authentication
│
├── Scheduled background jobs
│   └── → convex-cron-jobs
│       - crons.interval()
│       - crons.cron()
│       - Cleanup tasks
│
└── File uploads/downloads
    └── → convex-file-storage
        - generateUploadUrl()
        - getUrl()
        - File metadata
```

### AI and Agents

```
Building AI features?
├── Conversational agents
│   └── → convex-agents
│       - Thread management
│       - Message history
│       - Streaming responses
│
├── Tool-using agents
│   └── → convex-agents
│       - Tool definitions
│       - Function calling
│       - Error handling
│
├── RAG (Retrieval Augmented Generation)
│   └── → convex-agents
│       - Vector embeddings
│       - Similarity search
│       - Document indexing
│
└── Workflows
    └── → convex-agents
        - Multi-step processes
        - State management
        - Progress tracking
```

### Security

```
Reviewing security?
├── Quick check (5 min)
│   └── → convex-security-check
│       - Public vs internal functions
│       - Authentication checks
│       - Input validation
│
└── Deep audit (comprehensive)
    └── → convex-security-audit
        - Authorization patterns
        - Data access controls
        - Rate limiting
```

## Available Skills

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `convex-schema-validator` | Schema definition and validation | Defining tables, types, indexes |
| `convex-functions` | Queries, mutations, actions | Writing any Convex function |
| `convex-realtime` | Reactive patterns | Building real-time UIs |
| `convex-http-actions` | HTTP endpoints | Webhooks, REST APIs |
| `convex-cron-jobs` | Scheduled tasks | Background jobs, cleanup |
| `convex-file-storage` | File handling | Uploads, downloads, metadata |
| `convex-agents` | AI agents | LLMs, tools, RAG, workflows |
| `convex-migrations` | Schema evolution | Changing existing schemas |
| `convex-best-practices` | Production patterns | Code quality, optimization |
| `convex-security-check` | Quick security review | Fast security validation |
| `convex-security-audit` | Deep security review | Comprehensive audit |
| `convex-component-authoring` | Reusable components | Building shared libraries |

## Skill Locations

Skills are located in the `skills/` directory:

```
skills/
├── convex-agents/SKILL.md
├── convex-best-practices/SKILL.md
├── convex-component-authoring/SKILL.md
├── convex-cron-jobs/SKILL.md
├── convex-file-storage/SKILL.md
├── convex-functions/SKILL.md
├── convex-http-actions/SKILL.md
├── convex-migrations/SKILL.md
├── convex-realtime/SKILL.md
├── convex-schema-validator/SKILL.md
├── convex-security-audit/SKILL.md
└── convex-security-check/SKILL.md
```

## Common Patterns

### Basic CRUD

```typescript
// Schema
export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    completed: v.boolean(),
    userId: v.id("users"),
  }).index("by_user", ["userId"]),
});

// Query
export const list = query({
  args: { userId: v.id("users") },
  returns: v.array(taskValidator),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Mutation
export const create = mutation({
  args: { title: v.string(), userId: v.id("users") },
  returns: v.id("tasks"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      title: args.title,
      completed: false,
      userId: args.userId,
    });
  },
});
```

### Webhook Handler

```typescript
// convex/http.ts
const http = httpRouter();

http.route({
  path: "/webhooks/stripe",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const signature = request.headers.get("stripe-signature");
    const body = await request.text();
    
    // Verify and process
    await ctx.runMutation(internal.webhooks.processStripe, {
      signature,
      body,
    });
    
    return new Response("OK", { status: 200 });
  }),
});

export default http;
```

### Scheduled Job

```typescript
// convex/crons.ts
const crons = cronJobs();

crons.interval(
  "cleanup expired sessions",
  { hours: 1 },
  internal.sessions.cleanup,
  {}
);

export default crons;
```

## DO NOT

- Run `npx convex deploy` without explicit instruction
- Run any git commands without explicit instruction
- Edit files in `convex/_generated/`
- Use `filter()` instead of `withIndex()` on large tables
- Store secrets in code (use environment variables)
- Make public functions that should be internal

## Documentation Sources

Always fetch the latest documentation before implementing:

- **Primary**: https://docs.convex.dev/
- **LLMs.txt**: https://docs.convex.dev/llms.txt
- **Functions**: https://docs.convex.dev/functions
- **Database**: https://docs.convex.dev/database
- **Schema**: https://docs.convex.dev/database/schemas
- **Auth**: https://docs.convex.dev/auth
- **File Storage**: https://docs.convex.dev/file-storage
- **Scheduling**: https://docs.convex.dev/scheduling
- **AI/Agents**: https://docs.convex.dev/ai
- **Best Practices**: https://docs.convex.dev/understanding/best-practices/

## Update Command

To update to the latest version of convex-skills:

```
/convex --update-skill
```

This will fetch the latest skills from the repository and update your local installation.

## Installation

Install skills via npm:

```bash
npm install -g convex-skills

# Install all skills
convex-skills install-all

# Install specific skill
convex-skills install convex-functions

# List available skills
convex-skills list
```

Or install skills manually by copying from `skills/` to your project's `.claude/skills/` directory.

## References

- Convex Documentation: https://docs.convex.dev/
- Convex LLMs.txt: https://docs.convex.dev/llms.txt
- Convex GitHub: https://github.com/get-convex
- convex-skills Repository: https://github.com/get-convex/convex-skills
