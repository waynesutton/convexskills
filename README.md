# Convex Skills

A collection of AI-consumable skills for building production-ready applications with [Convex](https://convex.dev).

## Overview

This repository contains skills that help AI assistants understand and implement Convex best practices. Each skill provides structured guidance for specific aspects of Convex development.

## Installation

### Claude Code (via Marketplace)

```bash
# Coming soon - will be available in Claude Code Marketplace
```

### Claude Code (from local clone)

```bash
git clone https://github.com/get-convex/convex-skills.git
cd convex-skills
# Point Claude Code to this directory
```

### Manual Installation

Copy the desired skill's `SKILL.md` file to your project's `.claude/skills/` directory.

## Available Skills

| Skill | Description |
|-------|-------------|
| [convex-best-practices](skills/convex-best-practices/SKILL.md) | Guidelines for building production-ready Convex apps |
| [convex-functions](skills/convex-functions/SKILL.md) | Writing queries, mutations, actions, and HTTP actions |
| [convex-realtime](skills/convex-realtime/SKILL.md) | Patterns for building reactive applications |
| [convex-schema-validator](skills/convex-schema-validator/SKILL.md) | Database schema definition and validation |
| [convex-file-storage](skills/convex-file-storage/SKILL.md) | File upload, storage, and serving |
| [convex-agents](skills/convex-agents/SKILL.md) | Building AI agents with Convex |
| [convex-security-check](skills/convex-security-check/SKILL.md) | Quick security audit checklist |
| [convex-security-audit](skills/convex-security-audit/SKILL.md) | Deep security review patterns |
| [convex-component-authoring](skills/convex-component-authoring/SKILL.md) | Creating reusable Convex components |

## Skill Format

Each skill follows the [Anthropic Skills Template](https://github.com/anthropics/skills/blob/main/template/SKILL.md) format:

```markdown
---
name: Skill Name
description: Brief description
version: 1.0.0
author: Convex
tags: [convex, ...]
---

# Skill Name

## Documentation Sources
## Instructions
## Examples
## Best Practices
## References
```

## AI Integration Files

- `CLAUDE.md` - Default Claude configuration for Convex projects
- `GEMINI.md` - Gemini CLI integration for Convex projects
- `agents.md` - Convex agents specification

## OpenCode Plugin

See the [opencode-plugin](opencode-plugin/) directory for the OpenCode integration package.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this repository.

## License

MIT License - see [LICENSE](LICENSE) for details.

## References

- [Convex Documentation](https://docs.convex.dev/)
- [Convex LLMs.txt](https://docs.convex.dev/llms.txt)
- [Anthropic Skills](https://github.com/anthropics/skills)
# convexskills
