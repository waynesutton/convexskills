# Codebase Files

Brief description of each file in the repository.

## Root Files

| File                            | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `AGENTS.md`                     | Agent skills specification for AI coding agents |
| `CLAUDE.md`                     | Claude Code project context (mirrors AGENTS.md) |
| `CONTRIBUTING.md`               | Contribution guidelines                         |
| `GEMINI.md`                     | Gemini CLI integration instructions             |
| `LICENSE`                       | Apache-2.0 license                              |
| `README.md`                     | Project overview and installation               |
| `changelog.md`                  | Version history following keepachangelog format |
| `files.md`                      | This file, codebase structure reference         |
| `task.md`                       | Completed task tracking                         |
| `convex-skills-updates-plan.md` | Build guide and maintenance plan                |

## Skills Directory (`skills/`)

Core Convex skills for AI agents. Each skill has `name` matching folder name for `/skill` commands.

| Skill                                 | Description                              |
| ------------------------------------- | ---------------------------------------- |
| `avoid-feature-creep/SKILL.md`        | Prevent scope creep in development       |
| `convex/SKILL.md`                     | Umbrella index for all Convex skills     |
| `convex-agents/SKILL.md`              | Building AI agents with Convex           |
| `convex-best-practices/SKILL.md`      | Production-ready app guidelines          |
| `convex-component-authoring/SKILL.md` | Creating reusable Convex components      |
| `convex-cron-jobs/SKILL.md`           | Scheduled functions and background tasks |
| `convex-file-storage/SKILL.md`        | File upload, storage, and serving        |
| `convex-functions/SKILL.md`           | Queries, mutations, actions              |
| `convex-http-actions/SKILL.md`        | HTTP endpoints and webhooks              |
| `convex-migrations/SKILL.md`          | Schema evolution and data migrations     |
| `convex-realtime/SKILL.md`            | Reactive patterns and subscriptions      |
| `convex-schema-validator/SKILL.md`    | Schema definition and validation         |
| `convex-security-audit/SKILL.md`      | Deep security review patterns            |
| `convex-security-check/SKILL.md`      | Quick security audit checklist           |

## Command Directory (`command/`)

Slash command definitions for OpenCode integration.

| File        | Description                                            |
| ----------- | ------------------------------------------------------ |
| `convex.md` | `/convex` slash command entrypoint with decision trees |

## Templates Directory (`templates/`)

Templates for developers to copy when forking.

| File                 | Description                                  |
| -------------------- | -------------------------------------------- |
| `CLAUDE.md`          | Project context template for Convex projects |
| `skills/README.md`   | Installation guide for skill templates       |
| `skills/dev.md`      | Full-stack development practices template    |
| `skills/help.md`     | Problem-solving methodology template         |
| `skills/gitrules.md` | Git safety protocols template                |

## Claude Skills Directory (`.claude/skills/`)

Active Claude Code skills for this repository.

| File          | Description                       |
| ------------- | --------------------------------- |
| `convex.md`   | Convex-specific coding guidelines |
| `dev.md`      | Full-stack development practices  |
| `gitrules.md` | Git safety protocols              |
| `help.md`     | Problem-solving methodology       |
| `write.md`    | Writing style guide               |

## PRDs Directory (`prds/`)

Product requirement documents and planning.

| File                                          | Description                             |
| --------------------------------------------- | --------------------------------------- |
| `CLAUDE-MD-STRATEGY.md`                       | Strategy for CLAUDE.md templates        |
| `CLAUDE-MD-STRATEGY_1.md`                     | Alternate strategy document             |
| `MARKETPLACE-SUBMISSION.md`                   | Marketplace submission guidelines       |
| `create-convex-opencode-integration.md`       | OpenCode integration spec               |
| `future-skills-exploration.md`                | Future skills roadmap                   |
| `phase3-convex-docs-recommendations.md`       | Convex docs improvement recommendations |
| `phase4-convex-ai-website-recommendations.md` | convex.dev/ai recommendations           |
| `skillsplan.md`                               | Skills development plan                 |

## OpenCode Directory (`.opencode/`)

OpenCode plugin configuration and templates.

| Directory     | Description                             |
| ------------- | --------------------------------------- |
| `agent/`      | Agent templates for orchestration       |
| `command/`    | Command templates for Convex operations |
| `plugin/`     | Plugin hooks and tools                  |
| `skill/`      | OpenCode-specific skills                |
| `config.json` | Plugin configuration                    |

## Cursor Directory (`.cursor/`)

Cursor IDE configuration.

| Directory | Description                |
| --------- | -------------------------- |
| `plans/`  | Development plans          |
| `rules/`  | Workspace rules for Cursor |
