# Convex Skills: Build and Maintenance Guide

A practical guide for building, publishing, and maintaining AI agent skills packages.

## How This Package Was Built

### Architecture Overview

The package follows a simple, modular structure that works across multiple AI coding agents (Claude Code, Codex, OpenCode, Cursor, Gemini).

```
convex-skills/
├── skills/                    # Core skills (SKILL.md files)
├── templates/                 # Starter templates for forks
├── command/                   # Slash commands (OpenCode)
├── bin/cli.js                 # CLI for npm installs
├── index.js                   # Programmatic API
├── package.json               # npm configuration
├── AGENTS.md                  # Agent-facing docs
├── CLAUDE.md                  # Claude-specific context
└── GEMINI.md                  # Gemini-specific context
```

### Key Design Decisions

**1. One skill per folder**

Each skill lives in `skills/<skill-name>/SKILL.md`. This pattern:

- Makes discovery straightforward for AI agents
- Enables selective installation
- Follows the Agent Skills spec from Anthropic

**2. Frontmatter metadata**

Every `SKILL.md` starts with YAML frontmatter:

```yaml
---
name: convex-best-practices
description: Guidelines for building production-ready Convex apps
version: 1.0.0
author: Convex
tags: [convex, best-practices, typescript]
---
```

**3. Multi-agent support files**

Different AI tools read different files:

- `AGENTS.md` and `CLAUDE.md` for Claude Code
- `GEMINI.md` for Gemini CLI
- `.cursor/rules/` for Cursor IDE

**4. Dual distribution**

The package supports both:

- **npm install**: CLI and programmatic access
- **git clone**: Direct file access and forking

### Publishing to npm

**Initial setup:**

```bash
# Login to npm (once)
npm login

# Verify package.json has correct scope
# name: "@waynesutton/convex-skills"
```

**Publish workflow:**

```bash
# Bump version in package.json
npm version patch  # or minor/major

# Publish
npm publish --access public

# Verify
npm info @waynesutton/convex-skills
```

**package.json essentials:**

```json
{
  "name": "@waynesutton/convex-skills",
  "version": "1.0.3",
  "type": "module",
  "main": "index.js",
  "bin": {
    "convex-skills": "./bin/cli.js"
  },
  "files": [
    "skills/**/*.md",
    "templates/**/*.md",
    "AGENTS.md",
    "CLAUDE.md",
    "GEMINI.md",
    "index.js",
    "bin/"
  ]
}
```

The `files` array controls what gets published. Use `.npmignore` for additional exclusions.

---

## Maintenance Checklist

### Weekly

- [ ] Check Convex docs for API changes
- [ ] Review GitHub issues
- [ ] Update skills if Convex releases new features

### Monthly

- [ ] Audit all doc links in skills (broken link check)
- [ ] Review npm download stats
- [ ] Check for new AI agent platforms to support

### Per Release

- [ ] Update `changelog.md` with changes
- [ ] Bump version following semver
- [ ] Test CLI commands locally
- [ ] Test `npm pack` before publishing
- [ ] Tag release in git

---

## Updating Skills

### Adding a New Skill

1. Create folder: `skills/<skill-name>/`

2. Create `SKILL.md` with required structure:

```markdown
---
name: skill-name
description: What this skill does
version: 1.0.0
author: Convex
tags: [convex, relevant-tags]
---

# Skill Name

## Documentation Sources

[Links to official docs]

## Instructions

[Step-by-step guidance]

## Examples

[Working code examples]

## Best Practices

[Rules to follow]

## References

[Additional resources]
```

3. Add to `index.js` SKILLS object:

```javascript
export const SKILLS = {
  // ... existing
  "new-skill-name": "Description",
};
```

4. Add to `bin/cli.js` SKILLS object (same format)

5. Update `files.md` with new skill entry

6. Update `changelog.md`

7. Bump version and publish

### Updating Existing Skills

1. Edit the `SKILL.md` file
2. Update version in frontmatter if significant change
3. Document in `changelog.md`
4. Bump package version (patch for fixes, minor for features)

---

## Version Strategy

Follow [Semantic Versioning](https://semver.org/):

| Change Type                    | Version Bump | Example       |
| ------------------------------ | ------------ | ------------- |
| Typo fixes, doc clarifications | patch        | 1.0.3 → 1.0.4 |
| New skill added                | minor        | 1.0.4 → 1.1.0 |
| Breaking structure change      | major        | 1.1.0 → 2.0.0 |

---

## Testing Before Publish

```bash
# Test CLI locally
node bin/cli.js list
node bin/cli.js show convex-best-practices

# Test npm pack (see what will be published)
npm pack --dry-run

# Create local tarball for testing
npm pack
npm install ./waynesutton-convex-skills-1.0.3.tgz -g

# Test install commands
convex-skills list
convex-skills install convex-best-practices --dir /tmp/test-project
```

---

## Future Updates Roadmap

### Short Term (Next 30 Days)

- [ ] Add `convex-auth` skill for authentication patterns
- [ ] Add `convex-vector-search` skill for AI/embeddings
- [ ] Add `convex-testing` skill for test patterns
- [ ] Update all skills to reference Convex v1.18+ APIs

### Medium Term (Next 90 Days)

- [ ] Add skill validation CLI command
- [ ] Auto-generate skill index from folder structure
- [ ] Add `convex-deployment` skill for production patterns
- [ ] Add `convex-rate-limiting` skill
- [ ] Consider monorepo tooling if skills grow significantly

### Long Term

- [ ] Automated doc link checking in CI
- [ ] Community contribution pipeline
- [ ] Skill versioning independent of package version
- [ ] Integration tests for each skill's code examples

---

## Common Maintenance Tasks

### Fixing Broken Documentation Links

1. Search all skills for the broken URL
2. Update to current Convex docs URL
3. Verify new link works
4. Patch release

```bash
# Find all doc links
grep -r "docs.convex.dev" skills/
```

### Syncing with Convex API Changes

When Convex releases new versions:

1. Check [Convex changelog](https://docs.convex.dev/changelog)
2. Search skills for affected patterns
3. Update examples to use new APIs
4. Note deprecations in skill Best Practices section

### Adding Support for New AI Agent

1. Create agent-specific context file (like `GEMINI.md`)
2. Add installation instructions to README
3. Test with the target agent
4. Document in changelog

---

## Automation Ideas

### GitHub Actions for Link Checking

```yaml
name: Check Links
on:
  schedule:
    - cron: "0 0 * * 0" # Weekly
jobs:
  linkcheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: lycheeverse/lychee-action@v1
        with:
          args: --verbose ./skills/
```

### Pre-publish Checklist Script

```bash
#!/bin/bash
# scripts/pre-publish.sh

echo "Running pre-publish checks..."

# Check all skills have frontmatter
for skill in skills/*/SKILL.md; do
  if ! head -1 "$skill" | grep -q "^---$"; then
    echo "ERROR: $skill missing frontmatter"
    exit 1
  fi
done

# Verify index.js matches skills folder
echo "Skills in folder: $(ls -1 skills | wc -l)"
echo "Skills in index.js: $(grep -c '"convex-' index.js)"

echo "All checks passed!"
```

---

## Quick Reference

### Publish New Version

```bash
# 1. Update changelog.md
# 2. Bump version
npm version patch

# 3. Publish
npm publish --access public

# 4. Push tags
git push && git push --tags
```

### Test Installation Locally

```bash
npm pack
npm install -g ./waynesutton-convex-skills-*.tgz
convex-skills list
```

### Check Published Package

```bash
npm info @waynesutton/convex-skills
npm view @waynesutton/convex-skills versions
```

---

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/cli/v10/commands/npm-publish)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Agent Skills Spec](https://github.com/anthropics/skills)
- [Convex Documentation](https://docs.convex.dev/)
- [Convex LLMs.txt](https://docs.convex.dev/llms.txt)
