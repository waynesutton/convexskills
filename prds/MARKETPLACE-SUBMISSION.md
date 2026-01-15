# Claude Code Marketplace Submission Guide

Instructions for submitting convex-skills to the Claude Code Marketplace.

## Pre-Submission Checklist

### Required Files (Ready)

- [x] `CLAUDE.md` - Symlink to AGENTS.md
- [x] `AGENTS.md` - Agent instructions
- [x] `README.md` - Project overview
- [x] `LICENSE` - Apache-2.0
- [x] `CONTRIBUTING.md` - Contribution guidelines
- [x] `.claude-plugin/plugin.json` - Plugin manifest
- [x] `skills/` - 12 skills with SKILL.md files

### Files to Remove Before Submission

Delete these files and folders (internal/development only):

```
.claude/                    # Personal Cursor skills
.cursor/                    # Cursor IDE configuration
.opencode/                  # OpenCode plugin (separate project)
prds/                       # Internal planning documents
task.md                     # Internal task tracker
files.md                    # Internal file documentation
skills/convex-projects-claude/  # Non-standard (CLAUDE.md not SKILL.md)
skills/template/            # Template placeholder
```

### Files to Keep

```
.claude-plugin/plugin.json  # Required for marketplace
AGENTS.md                   # Agent instructions
CLAUDE.md                   # Symlink to AGENTS.md
README.md                   # Project overview
LICENSE                     # Apache-2.0
CONTRIBUTING.md             # Contribution guidelines
GEMINI.md                   # Gemini CLI support
changelog.md                # Optional, version history
templates/CLAUDE.md         # User template (optional resource)
skills/                     # All SKILL.md files
```

## Submission Steps

### Step 1: Clean the Repository

Run these commands to remove internal files:

```bash
# Remove internal development files
rm -rf .claude/
rm -rf .cursor/
rm -rf .opencode/
rm -rf prds/
rm -f task.md
rm -f files.md

# Remove non-standard skill folders
rm -rf skills/convex-projects-claude/
rm -rf skills/template/
```

### Step 2: Verify Structure

After cleanup, the repo should look like:

```
convex-skills/
├── .claude-plugin/
│   └── plugin.json
├── AGENTS.md
├── CLAUDE.md -> AGENTS.md
├── CONTRIBUTING.md
├── GEMINI.md
├── LICENSE
├── README.md
├── changelog.md
├── templates/
│   └── CLAUDE.md
└── skills/
    ├── convex-agents/
    │   └── SKILL.md
    ├── convex-best-practices/
    │   └── SKILL.md
    ├── convex-component-authoring/
    │   └── SKILL.md
    ├── convex-cron-jobs/
    │   └── SKILL.md
    ├── convex-file-storage/
    │   └── SKILL.md
    ├── convex-functions/
    │   └── SKILL.md
    ├── convex-http-actions/
    │   └── SKILL.md
    ├── convex-migrations/
    │   └── SKILL.md
    ├── convex-realtime/
    │   └── SKILL.md
    ├── convex-schema-validator/
    │   └── SKILL.md
    ├── convex-security-audit/
    │   └── SKILL.md
    └── convex-security-check/
        └── SKILL.md
```

### Step 3: Commit and Push

```bash
git add -A
git commit -m "Prepare for Claude Code Marketplace submission"
git push origin main
```

### Step 4: Submit to Marketplace

1. Go to Claude Code marketplace submission (contact Anthropic or use their submission process)
2. Provide the GitHub repository URL
3. Wait for review and approval

## Post-Submission

After acceptance, users can install with:

```bash
# Via marketplace
claude plugin marketplace add get-convex/convex-skills
claude plugin install convex-skills

# Or direct installation
/install-skill https://github.com/get-convex/convex-skills/tree/main/skills/convex-best-practices
```

## Notes

- The `templates/CLAUDE.md` file is a user resource, not a skill. Users copy it to their own projects.
- `GEMINI.md` provides compatibility with Gemini CLI users.
- The symlink `CLAUDE.md -> AGENTS.md` ensures both Claude Code and other agents read the same instructions.
