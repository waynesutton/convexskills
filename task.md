# Task Tracker

## Current Status: Phase 1 Complete, Convex App Pending

---

## Completed Tasks

### Phase 1: Repository Structure
- [x] Create repository structure mirroring getsentry/skills pattern
- [x] Add README.md, LICENSE, CONTRIBUTING.md
- [x] Create files.md and changelog.md

### Phase 1: Skills (9 total)
- [x] convex-best-practices - Error handling, OCC, production patterns
- [x] convex-functions - Queries, mutations, actions, HTTP actions
- [x] convex-realtime - Subscriptions, optimistic updates, pagination
- [x] convex-schema-validator - Schema definition, indexes, migrations
- [x] convex-file-storage - Upload, serving, metadata
- [x] convex-agents - AI agents with threads and tools
- [x] convex-security-check - Quick security checklist
- [x] convex-security-audit - Deep security review
- [x] convex-component-authoring - Reusable components

### Phase 1B: Supporting Files
- [x] Terminal UI (static HTML/CSS/JS)
- [x] CLAUDE.md template
- [x] GEMINI.md template
- [x] agents.md specification

### Phase 1C: Future Planning
- [x] future-skills-exploration.md

### Phase 2: OpenCode Plugin
- [x] Plugin structure and package.json
- [x] Plugin hooks (session, file, tool events)
- [x] Custom tools (schema_suggest, function_test, migration_plan)
- [x] Agent templates (convex-build.md, convex-debug.md)
- [x] Command templates (convex-init, convex-deploy, convex-logs)
- [x] Install script

### Phase 3 & 4: Documentation Notes
- [x] phase3-convex-docs-recommendations.md
- [x] phase4-convex-ai-website-recommendations.md

---

## Pending Tasks

### Convex App Setup
- [ ] Initialize Convex project with `npm create convex@latest`
- [ ] Define schema for skills table
- [ ] Create queries for listing and searching skills
- [ ] Build React frontend with terminal UI design
- [ ] Add routing for individual skill pages
- [ ] Deploy to Convex

### Optional Enhancements
- [ ] Add full-text search for skills
- [ ] Add view tracking/analytics
- [ ] Add skill bookmarking (requires auth)
- [ ] Implement `npx convex claude-init` command

---

## Notes

- Static terminal UI available at `src/terminal-ui/`
- All 9 skills content ready in `skills/` directory
- OpenCode plugin ready in `opencode-plugin/`
