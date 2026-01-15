# Claude Code Skills Templates

These are template skills for Claude Code (claude.ai/code). Copy them to your project's `.claude/skills/` directory and customize as needed.

## Installation

1. Create the skills directory in your project:

```bash
mkdir -p .claude/skills
```

2. Copy the skills you want:

```bash
cp templates/skills/dev.md .claude/skills/
cp templates/skills/help.md .claude/skills/
cp templates/skills/gitrules.md .claude/skills/
```

3. Customize each skill for your project's needs.

## Available Templates

| Template | Purpose |
|----------|---------|
| `dev.md` | Full-stack Convex development practices and coding standards |
| `help.md` | Problem-solving methodology and change management guidelines |
| `gitrules.md` | Git safety protocols to prevent accidental data loss |

## Customization Tips

**dev.md**
- Add your specific tech stack
- Include project-specific documentation links
- Add custom coding conventions

**help.md**
- Adjust the confidence threshold (default 98%)
- Add project-specific change restrictions
- Include team-specific documentation policies

**gitrules.md**
- Generally keep as-is (safety rules are universal)
- Add project-specific branch protection rules if needed

## Usage with Claude Code

Once installed, Claude Code will automatically use these skills when working in your project. You can also reference them explicitly:

```
Use the dev skill for this task
Follow gitrules before any git operation
```

## References

- Claude Code documentation: https://docs.anthropic.com/en/docs/claude-code
- Convex documentation: https://docs.convex.dev/
