# Phase 3: Convex Documentation Update Recommendations

**Status**: Notes for Convex team consideration
**Location**: https://github.com/get-convex/convex-backend/tree/main/npm-packages/docs/docs

## Overview

This document outlines recommendations for updating the official Convex documentation to include AI-related resources and skills.

## Proposed Documentation Additions

### 1. New Section: `/docs/ai/`

Create a dedicated AI section in the documentation:

```
docs/ai/
├── index.md           # AI integration overview
├── skills.md          # Link to convex-skills repo
├── claude.md          # CLAUDE.md generation guide
├── gemini.md          # GEMINI.md template
├── opencode.md        # OpenCode plugin documentation
└── agents.md          # Convex agents guide
```

### 2. `/docs/ai/index.md`

**AI Integration Overview**

```markdown
# AI Integration

Convex provides first-class support for AI development through:

- **MCP Server** - Model Context Protocol for AI assistants
- **Skills** - AI-consumable documentation for Claude, Gemini, etc.
- **Agents** - Build persistent AI agents with Convex
- **Vector Search** - RAG and semantic search capabilities

## Quick Links

- [Convex Skills Repository](https://github.com/get-convex/convex-skills)
- [Convex MCP Server](https://docs.convex.dev/ai/convex-mcp-server)
- [Vector Search](https://docs.convex.dev/search/vector-search)
```

### 3. `/docs/ai/skills.md`

**Skills Documentation**

```markdown
# Convex Skills

AI-consumable skills for Claude, Gemini, and other AI assistants.

## Available Skills

| Skill | Description |
|-------|-------------|
| convex-best-practices | Production-ready app guidelines |
| convex-functions | Queries, mutations, actions |
| convex-realtime | Reactive patterns |
| ... | ... |

## Installation

### Claude Code
[Instructions for installing in Claude Code]

### Manual Installation
[Instructions for manual installation]

## Repository

https://github.com/get-convex/convex-skills
```

### 4. `/docs/ai/claude.md`

**CLAUDE.md Guide**

```markdown
# CLAUDE.md for Convex Projects

Configure Claude to understand your Convex project.

## Automatic Generation

```bash
npx convex claude-init
```

This command generates a CLAUDE.md with:
- Schema tables and indexes
- Function signatures
- Environment variable placeholders
- Project-specific context

## Manual Template

[Include CLAUDE.md template]
```

### 5. `/docs/ai/gemini.md`

**GEMINI.md Guide**

```markdown
# GEMINI.md for Convex Projects

Configure Gemini CLI to understand your Convex project.

## Template

[Include GEMINI.md template]
```

### 6. `/docs/ai/opencode.md`

**OpenCode Integration**

```markdown
# OpenCode Integration

Use the Convex OpenCode plugin for enhanced AI development.

## Installation

```bash
npx convex-opencode install
```

## Features

- Automatic dev server management
- Schema change detection
- Custom Convex tools
- Agent templates

## Repository

https://github.com/get-convex/convex-skills/tree/main/opencode-plugin
```

## Implementation Notes

### For Convex Team

1. **No immediate action required** - These are recommendations
2. **Skills repo is external** - Maintained separately from core docs
3. **Consider npx convex claude-init** - Leverage schema introspection
4. **Keep AI docs separate** - Easier to update independently

### Integration Points

- Link from main docs sidebar
- Cross-reference in AI/LLM documentation
- Add to llms.txt when finalized

## Timeline Suggestion

1. Week 1: Create `/docs/ai/index.md` and `skills.md`
2. Week 2: Add `claude.md` and `gemini.md`
3. Week 3: Document OpenCode integration
4. Week 4: Review and publish

## References

- Current AI docs: https://docs.convex.dev/ai
- Skills repo: https://github.com/get-convex/convex-skills
- LLMs.txt: https://docs.convex.dev/llms.txt
