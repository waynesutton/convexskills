# CLAUDE.md Strategy for Convex Projects

A practical guide for teams adopting Claude Code with Convex backends.

## What is CLAUDE.md

CLAUDE.md is a configuration file that Claude Code automatically reads when working in your repository. It provides persistent project context that shapes how Claude understands and generates code for your specific codebase.

Think of it as onboarding documentation for your AI pair programmer. Instead of explaining your stack, conventions, and patterns at the start of every session, Claude reads this file and arrives ready to work.

## Why This Matters for Convex Projects

Convex has patterns that differ from traditional backends. Without proper context, Claude might:

- Use `.filter()` instead of `.withIndex()` on large tables (performance disaster)
- Call external APIs from mutations instead of actions (will fail)
- Use `undefined` as a value instead of `null` (removes the field entirely)
- Schedule functions with `api.*` instead of `internal.*` (security issue)
- Forget to validate arguments or check authentication

A well-crafted CLAUDE.md prevents these mistakes before they happen. Claude follows CLAUDE.md instructions more strictly than conversational prompts, treating them as system-level rules for your project.

## How the Template Works

The included CLAUDE.md template covers:

| Section | Purpose |
|---------|---------|
| Bash Commands | Common CLI operations so Claude can run, test, and deploy |
| File Structure | Where things live so Claude navigates correctly |
| Function Types | Query vs mutation vs action decision tree |
| Schema Patterns | Validator syntax and table definitions |
| Index Queries | The critical `.withIndex()` pattern |
| Authentication | Standard auth check pattern |
| Scheduling | Cron and delayed execution patterns |
| IMPORTANT Rules | Non-negotiable constraints |
| Common Gotchas | Convex-specific behaviors that trip up developers |

## Team Implementation Strategy

### Step 1: Add to your repository

Drop the CLAUDE.md file in your project root:

```
your-project/
├── CLAUDE.md          # ← Add here
├── convex/
├── src/
└── package.json
```

Commit it to version control. This ensures every team member gets the same Claude behavior.

### Step 2: Customize for your project

Update the template with your specifics:

1. **Project Context section**: Add your project name and description
2. **Project-Specific Notes section**: Add your conventions
   - Business logic rules
   - Naming conventions beyond the defaults
   - Architecture decisions
   - Integration patterns (Clerk, Resend, etc.)

Example customization:

```markdown
## Project-Specific Notes

- All user-facing mutations require `userId` from Clerk auth
- Email functions use Resend via `convex/emails.ts`
- Feature flags stored in `settings` table, check before new features
- Use `internal.audit.log` for sensitive operations
```

### Step 3: Keep it lean

Anthropic's research shows that CLAUDE.md files with too many instructions cause Claude to ignore them. Follow these guidelines:

- **Target 100-300 lines** for most projects
- **Include only universally applicable rules** - not edge cases
- **Use code examples** instead of verbose explanations
- **Reference external docs** for deep dives instead of inlining everything

When you find yourself repeating instructions to Claude, add them to CLAUDE.md. But resist the urge to document every possible scenario.

### Step 4: Iterate based on usage

During Claude Code sessions, press `#` to add instructions that get automatically incorporated into CLAUDE.md. This builds your context file organically as the team works.

Review CLAUDE.md monthly:
- Remove instructions Claude consistently follows without prompting
- Add patterns that required repeated correction
- Update when your stack or conventions change

## Team Sharing Best Practices

### For new team members

Include CLAUDE.md context in your onboarding:

> "We use Claude Code for development. The CLAUDE.md file in the repo root contains our Convex conventions. Read through it before your first Claude session - it's also useful as a quick reference for Convex patterns."

### For code reviews

When reviewing Claude-assisted PRs, check if the code follows CLAUDE.md conventions. If Claude consistently misses something, that's a signal to update the file.

### For multiple projects

Create a base template for your organization, then customize per project:

```
your-org/
├── templates/
│   └── CLAUDE.md.template    # Base template
├── project-a/
│   └── CLAUDE.md             # Customized for project A
└── project-b/
    └── CLAUDE.md             # Customized for project B
```

### For monorepos

Place CLAUDE.md files at multiple levels:

```
monorepo/
├── CLAUDE.md                 # Org-wide conventions
├── apps/
│   ├── web/
│   │   └── CLAUDE.md         # Web app specifics
│   └── mobile/
│       └── CLAUDE.md         # Mobile app specifics
└── packages/
    └── shared/
        └── CLAUDE.md         # Shared package conventions
```

Claude reads all CLAUDE.md files from current directory up to root, merging the context.

## Advanced: Organizing with .claude/rules/

For larger projects, split instructions into focused files:

```
your-project/
├── .claude/
│   ├── CLAUDE.md             # Main instructions
│   └── rules/
│       ├── database.md       # Schema and query patterns
│       ├── auth.md           # Authentication rules
│       ├── testing.md        # Test conventions
│       └── security.md       # Security requirements
└── convex/
```

All `.md` files in `.claude/rules/` are automatically loaded with the same priority as CLAUDE.md.

## Documentation Links for Reference

When Claude needs deeper information beyond CLAUDE.md, point to these official docs:

### Core Concepts
- **Best Practices**: https://docs.convex.dev/understanding/best-practices
- **TypeScript Patterns**: https://docs.convex.dev/understanding/best-practices/typescript
- **The Zen of Convex**: https://docs.convex.dev/understanding/zen

### Database
- **Schemas**: https://docs.convex.dev/database/schemas
- **Reading Data**: https://docs.convex.dev/database/reading-data
- **Indexes**: https://docs.convex.dev/database/reading-data/indexes
- **Data Types**: https://docs.convex.dev/database/types

### Functions
- **Queries**: https://docs.convex.dev/functions/query-functions
- **Mutations**: https://docs.convex.dev/functions/mutation-functions
- **Actions**: https://docs.convex.dev/functions/actions
- **HTTP Actions**: https://docs.convex.dev/functions/http-actions

### Platform Features
- **Authentication**: https://docs.convex.dev/auth
- **Scheduling**: https://docs.convex.dev/scheduling
- **File Storage**: https://docs.convex.dev/file-storage
- **Full-Text Search**: https://docs.convex.dev/search/text-search
- **Vector Search**: https://docs.convex.dev/search/vector-search

### AI Integration
- **AI Code Generation**: https://docs.convex.dev/ai
- **AI Agents**: https://docs.convex.dev/agents
- **Convex MCP Server**: https://docs.convex.dev/ai/convex-mcp-server

### Full LLM Context
- **llms.txt (doc index)**: https://docs.convex.dev/llms.txt
- **llms-full.txt (complete docs)**: https://docs.convex.dev/llms-full.txt
- **Convex AI Rules**: https://convex.link/convex_rules.txt

### Claude Code Resources
- **Claude Code Best Practices**: https://www.anthropic.com/engineering/claude-code-best-practices
- **Writing a Good CLAUDE.md**: https://www.humanlayer.dev/blog/writing-a-good-claude-md
- **Claude Code Memory Docs**: https://code.claude.com/docs/en/memory

## Measuring Success

Track these signals to know if your CLAUDE.md is working:

**Positive signals:**
- Claude generates valid Convex code on first attempt
- Fewer corrections needed for common patterns
- New team members ramp up faster with Claude
- Consistent code style across Claude-assisted PRs

**Signals to improve CLAUDE.md:**
- Claude repeatedly makes the same mistake
- Team members add the same instruction manually each session
- Code reviews catch pattern violations Claude should have known

## Summary

A good CLAUDE.md for Convex projects:

1. **Covers the critical patterns** - function types, validators, indexes, auth
2. **Documents the gotchas** - behaviors unique to Convex that trip up AI
3. **Stays concise** - 100-300 lines, code examples over prose
4. **Evolves with your project** - update as you learn what Claude needs
5. **Lives in version control** - shared across the entire team

The template provided gives you a production-ready starting point. Customize it for your project, commit it to your repo, and iterate based on real usage.

Your team will write better Convex code faster, with Claude as a genuinely useful collaborator instead of a pattern-confused assistant.
