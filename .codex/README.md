# Codex Skills Integration

This folder enables Codex to auto-discover Convex skills from this repository.

## Setup

Codex auto-discovers skills from `.codex/skills` at the repo root. To link the skills:

```bash
# From the repo root
ln -s ../skills .codex/skills
```

Or copy specific skills:

```bash
mkdir -p .codex/skills
cp -r skills/convex-best-practices .codex/skills/
cp -r skills/convex-eslint .codex/skills/
```

## Alternative: Install to CODEX_HOME

For global access across all projects:

```bash
# Defaults to ~/.codex if CODEX_HOME is unset
cp -r skills/* "$CODEX_HOME/skills/"
```

## Available Skills

All skills in the `skills/` directory are available for Codex:

- convex-best-practices
- convex-eslint
- convex-functions
- convex-realtime
- convex-schema-validator
- convex-file-storage
- convex-agents
- convex-cron-jobs
- convex-http-actions
- convex-migrations
- convex-security-check
- convex-security-audit
- convex-component-authoring

See the main [README](/README.md) for full documentation.
