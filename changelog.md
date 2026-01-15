# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Template skills for developers who fork the repository
  - `templates/skills/README.md`: Installation and usage guide
  - `templates/skills/dev.md`: Full-stack development practices template
  - `templates/skills/help.md`: Problem-solving methodology template
  - `templates/skills/gitrules.md`: Git safety protocols template
- `files.md`: Codebase structure reference
- `task.md`: Completed task tracking
- `docs.md`: Documentation index

### Changed

- Updated `README.md` with templates section and repository structure

## [1.0.0] - 2026-01-14

### Added

- Initial repository structure mirroring getsentry/skills pattern
- 9 core Convex skills:
  - `convex-best-practices`: Production-ready app guidelines, error handling, OCC
  - `convex-functions`: Queries, mutations, actions, HTTP actions
  - `convex-realtime`: Reactive patterns, subscriptions, optimistic updates
  - `convex-schema-validator`: Schema definition, typing, validation, migrations
  - `convex-file-storage`: File upload, storage, serving, metadata
  - `convex-agents`: AI agents with thread management and tools
  - `convex-security-check`: Quick security audit checklist
  - `convex-security-audit`: Deep security review patterns
  - `convex-component-authoring`: Creating reusable Convex components
- Skill template following Anthropic approved format
- Terminal UI for skill browsing with amber/gold tree design
- GEMINI.md for Gemini CLI integration
- agents.md specification for Convex agents
- CLAUDE.md template for Convex projects
- Future skills exploration document
- OpenCode plugin for Convex sync:
  - Plugin hooks for session, file, and tool events
  - Custom tools (schema_suggest, function_test, migration_plan)
  - Agent templates (convex-build.md, convex-debug.md)
  - Command templates (convex-init, convex-deploy, convex-logs)
  - Installation script
- Phase 3 documentation recommendations for Convex docs
- Phase 4 documentation recommendations for convex.dev/ai
- Project tracking files (files.md, changelog.md)
- README.md with installation instructions
- CONTRIBUTING.md with guidelines
- MIT License
