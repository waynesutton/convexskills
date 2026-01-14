# Create Convex OpenCode Integration Package

Build an OpenCode integration package for Convex that includes a sync plugin and a project template. This should be published as an npm package that OpenCode users can install.

## Project structure

```
convex-opencode/
├── package.json
├── README.md
├── plugin/
│   ├── index.ts              # Main plugin export
│   ├── sync.ts               # File sync and dev server management
│   ├── context.ts            # Deployment context injection
│   └── tools.ts              # Custom Convex tools for agents
├── template/
│   ├── opencode.json         # OpenCode config with Convex defaults
│   ├── agents/
│   │   ├── convex-build.md   # Primary agent for Convex development
│   │   └── convex-debug.md   # Subagent for debugging Convex issues
│   └── commands/
│       ├── convex-init.md    # /convex-init command
│       ├── convex-deploy.md  # /convex-deploy command
│       └── convex-logs.md    # /convex-logs command
└── install.ts                # Installation script
```

## Plugin requirements

The plugin should hook into these OpenCode events:

### session.start

- Run `npx convex dev` status check
- Inject deployment info (tables, functions, env vars) into agent context
- Detect if user is in a Convex project (has `convex/` directory)

### file.edited

- When `convex/schema.ts` changes, trigger schema push
- When any file in `convex/` changes, ensure dev server is running
- Auto-format Convex files if prettier is available

### tool.execute.before

- Intercept file reads in `convex/` to add schema context
- Block edits to `convex/_generated/` (these are auto-generated)

### tool.execute.after

- After creating new Convex functions, remind agent to test with MCP tools
- After schema changes, suggest running queries to verify

### session.idle

- Check for Convex dev server errors in background
- Surface any function failures from logs

Use the OpenCode plugin SDK pattern:

```typescript
import type { Plugin } from "@opencode-ai/plugin"

export const ConvexSyncPlugin: Plugin = async ({ project, client, $, directory }) => {
  // Check if this is a Convex project
  const isConvexProject = await checkForConvexDirectory(directory)
  if (!isConvexProject) return {}

  return {
    'session.start': async () => {
      // Implementation
    },
    'file.edited': async ({ path }) => {
      // Implementation
    },
    // ... other hooks
  }
}
```

## Template requirements

### opencode.json

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

### convex-build.md agent

- Primary agent optimized for Convex development
- System prompt includes Convex best practices:
  - Always define schemas before writing queries
  - Use indexes for queries that filter or sort
  - Prefer queries over actions for database reads
  - Use optimistic updates for responsive UIs
  - Handle errors with ConvexError for user-facing messages
- Has access to all Convex MCP tools
- Temperature 0 for deterministic code generation

### convex-debug.md subagent

- Specialized for debugging Convex issues
- Can read logs, inspect function errors, check schema mismatches
- Prompt focuses on common Convex pitfalls:
  - Missing indexes causing slow queries
  - Schema validation failures
  - Auth context not available
  - Action vs mutation confusion

### Custom commands

- `/convex-init` - Initialize Convex in current project, create schema.ts template
- `/convex-deploy` - Deploy to production with confirmation
- `/convex-logs` - Fetch and display recent function logs

## Custom tools

Add these tools via the plugin:

### convex_schema_suggest

- Analyzes current schema and suggests improvements
- Checks for missing indexes based on query patterns in codebase

### convex_function_test

- Runs a Convex function with test arguments
- Wraps the MCP `run` tool with better error formatting

### convex_migration_plan

- Given a schema change, generates migration strategy
- Identifies breaking changes and suggests backfill approach

## Installation

Create an install script that:

1. Adds plugin to user's opencode.json
2. Copies template files to `.opencode/` directory
3. Configures MCP server if not already present
4. Runs `npx convex dev` to verify setup

User should be able to install with:

```bash
npx convex-opencode install
```

Or manually add to opencode.json:

```json
{
  "plugin": ["convex-opencode"]
}
```

## Key references

- OpenCode plugin docs: https://opencode.ai/docs/plugins/
- OpenCode agent docs: https://opencode.ai/docs/agents/
- OpenCode skills docs: https://opencode.ai/docs/skills/
- Convex MCP server: https://docs.convex.dev/ai/convex-mcp-server
- Convex docs index: https://docs.convex.dev/llms.txt

## Testing

Test the plugin by:

1. Creating a new Convex project with `npm create convex`
2. Installing the plugin
3. Starting an OpenCode session
4. Verify deployment context is injected on session start
5. Edit `convex/schema.ts` and verify sync triggers
6. Try the custom commands
7. Test the custom tools work correctly
