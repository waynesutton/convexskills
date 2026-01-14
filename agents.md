# Convex Skills

Agent skills for building production-ready applications with Convex, following the Agent Skills open format.

## Overview

This repository contains packaged instructions that help AI coding agents understand and implement Convex best practices. Skills are automatically invoked when relevant to your task.

## Available Skills

| Skill                                                                    | Description                                           |
| ------------------------------------------------------------------------ | ----------------------------------------------------- |
| [convex-best-practices](skills/convex-best-practices/SKILL.md)           | Guidelines for building production-ready Convex apps  |
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

## References

- Convex Documentation: https://docs.convex.dev/
- Convex LLMs.txt: https://docs.convex.dev/llms.txt
- Best Practices: https://docs.convex.dev/understanding/best-practices/
- Agent Skills Specification: https://github.com/anthropics/skills

## License

Apache-2.0
