# Convex Agents

Specification for AI agents built on Convex for persistent, stateful workflows.

## Overview

Convex Agents are AI-powered assistants that leverage Convex's real-time database and functions to provide:

- **Persistent Conversations** - Thread history survives restarts
- **Real-time Updates** - Stream responses to clients automatically
- **Tool Execution** - Run Convex functions as agent capabilities
- **Durable Workflows** - Long-running tasks with reliability
- **Built-in RAG** - Vector search for knowledge retrieval

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Convex Agent                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Threads   │  │   Tools     │  │   Knowledge Base    │ │
│  │  Management │  │  Registry   │  │   (Vector Store)    │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    Convex Database                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   threads   │  │  messages   │  │     documents       │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Capabilities

### Thread Management

- Create and manage conversation threads
- Store message history persistently
- Support multiple concurrent conversations
- Thread metadata and tagging

### Tool Integration

- Define custom tools as Convex functions
- Type-safe tool arguments and returns
- Automatic tool result handling
- Tool execution logging

### Streaming Responses

- Real-time token streaming to clients
- Partial response updates
- Streaming progress indicators
- Graceful error handling

### RAG Patterns

- Vector embeddings for documents
- Semantic search across knowledge base
- Context injection into prompts
- Citation and source tracking

### Workflow Orchestration

- Multi-step agent workflows
- Conditional branching
- Parallel task execution
- Workflow state persistence

## Integration

### Installation

```bash
npm install @convex-dev/agent ai openai
```

### Basic Setup

```typescript
// convex/agent.ts
import { Agent } from "@convex-dev/agent";
import { components } from "./_generated/api";
import { OpenAI } from "openai";

const openai = new OpenAI();

export const agent = new Agent(components.agent, {
  chat: openai.chat,
  textEmbedding: openai.embeddings,
});
```

### Using the Agent

```typescript
// Create thread
const threadId = await agent.createThread(ctx, { userId });

// Send message
const response = await agent.chat(ctx, {
  threadId,
  messages: [{ role: "user", content: "Hello" }],
  tools: [myTool],
});
```

## Schema Requirements

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  threads: defineTable({
    userId: v.id("users"),
    title: v.string(),
    metadata: v.optional(v.any()),
  }).index("by_user", ["userId"]),

  messages: defineTable({
    threadId: v.id("threads"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_thread", ["threadId"]),

  documents: defineTable({
    content: v.string(),
    embedding: v.array(v.float64()),
    metadata: v.any(),
  }).vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 1536,
  }),
});
```

## Best Practices

1. **Store all conversations** - Never rely on in-memory state
2. **Use streaming** - Better UX for long responses
3. **Implement tools wisely** - Keep tools focused and atomic
4. **Handle errors gracefully** - Provide meaningful error messages
5. **Log tool usage** - Track what agents do for debugging

## References

- Convex AI Documentation: https://docs.convex.dev/ai
- Convex Agent Component: https://www.npmjs.com/package/@convex-dev/agent
- Convex LLMs.txt: https://docs.convex.dev/llms.txt
