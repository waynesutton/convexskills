# Convex OpenCode Plugin

OpenCode integration package for Convex development. This plugin provides automatic sync, context injection, and custom tools for building Convex applications with OpenCode.

## Installation

```bash
npx convex-opencode install
```

Or manually add to your `opencode.json`:

```json
{
  "plugin": ["convex-opencode"]
}
```

## Features

### Automatic Sync

- Detects Convex projects (has `convex/` directory)
- Monitors `convex/schema.ts` changes and triggers schema push
- Ensures dev server is running when editing Convex files
- Blocks edits to `convex/_generated/` (auto-generated files)

### Context Injection

On session start, the plugin injects:
- Deployment info (tables, functions, environment variables)
- Current schema structure
- Available function signatures

### Custom Tools

#### `convex_schema_suggest`
Analyzes current schema and suggests improvements based on query patterns.

#### `convex_function_test`
Runs a Convex function with test arguments and formats results.

#### `convex_migration_plan`
Given a schema change, generates a migration strategy with backfill approach.

### Custom Commands

- `/convex-init` - Initialize Convex in current project
- `/convex-deploy` - Deploy to production with confirmation
- `/convex-logs` - Fetch and display recent function logs

## Configuration

The plugin uses this default `opencode.json` configuration:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["convex-opencode"],
  "mcp": {
    "convex": {
      "command": "npx",
      "args": ["-y", "convex@latest", "mcp", "start"]
    }
  },
  "agent": {
    "build": {
      "tools": {
        "convex_*": true
      }
    }
  }
}
```

## Agent Templates

### convex-build.md

Primary agent optimized for Convex development with:
- Convex best practices in system prompt
- Access to all Convex MCP tools
- Temperature 0 for deterministic code generation

### convex-debug.md

Specialized agent for debugging Convex issues:
- Can read logs and inspect function errors
- Focuses on common Convex pitfalls
- Schema validation and auth context checks

## Plugin Hooks

| Hook | Trigger | Action |
|------|---------|--------|
| `session.start` | Session begins | Check dev server, inject context |
| `file.edited` | File saved | Trigger schema push if needed |
| `tool.execute.before` | Before tool runs | Add schema context |
| `tool.execute.after` | After tool runs | Suggest testing |
| `session.idle` | No activity | Check for dev server errors |

## Development

```bash
# Build the plugin
npm run build

# Test installation
npm run install-plugin
```

## References

- [OpenCode Plugin Docs](https://opencode.ai/docs/plugins/)
- [OpenCode Agent Docs](https://opencode.ai/docs/agents/)
- [Convex MCP Server](https://docs.convex.dev/ai/convex-mcp-server)
- [Convex Documentation](https://docs.convex.dev/)
