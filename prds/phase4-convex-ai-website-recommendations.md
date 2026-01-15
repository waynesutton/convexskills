# Phase 4: convex.dev/ai Website Update Recommendations

**Status**: Notes for Convex team consideration
**Location**: https://convex.dev/ai

## Overview

This document outlines recommendations for updating the convex.dev/ai landing page to showcase AI integration capabilities and the new skills repository.

## Current State

The convex.dev/ai page currently covers:
- Convex AI features overview
- Vector search capabilities
- MCP server documentation

## Proposed Updates

### 1. Skills Section

Add a dedicated section showcasing available skills:

```
┌─────────────────────────────────────────────────────────────┐
│                     AI Skills for Convex                     │
├─────────────────────────────────────────────────────────────┤
│  Build with AI using production-ready Convex skills          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Best         │  │ Functions    │  │ Realtime     │       │
│  │ Practices    │  │              │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Security     │  │ Agents       │  │ File Storage │       │
│  │ Audit        │  │              │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│  [View All Skills →] [GitHub Repository →]                   │
└─────────────────────────────────────────────────────────────┘
```

### 2. AI Tools Section

Showcase integrations with AI tools:

```
┌─────────────────────────────────────────────────────────────┐
│                     AI Tool Integrations                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Claude Code                                          │    │
│  │ Install Convex skills directly in Claude Code        │    │
│  │ [Get Started →]                                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Gemini CLI                                           │    │
│  │ Use GEMINI.md for Convex project context             │    │
│  │ [Learn More →]                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ OpenCode                                             │    │
│  │ Convex plugin for enhanced AI development            │    │
│  │ [Install Plugin →]                                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3. Quick Start Commands

Add prominent quick start section:

```
┌─────────────────────────────────────────────────────────────┐
│                       Quick Start                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  # Generate CLAUDE.md for your project                       │
│  npx convex claude-init                                      │
│                                                              │
│  # Install OpenCode plugin                                   │
│  npx convex-opencode install                                 │
│                                                              │
│  # Start MCP server                                          │
│  npx convex mcp start                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4. Skills Directory

Interactive skills directory (similar to terminal UI):

```
┌─────────────────────────────────────────────────────────────┐
│                     Skills Directory                         │
├─────────────────────────────────────────────────────────────┤
│  📁 skills                                                   │
│  ├── 🔖 convex-best-practices.md                            │
│  ├── 🔖 convex-functions.md                                 │
│  ├── 🔖 convex-realtime.md                                  │
│  ├── 🔖 convex-schema-validator.md                          │
│  ├── 🔖 convex-file-storage.md                              │
│  ├── 🔖 convex-agents.md                                    │
│  ├── 🔖 convex-security-check.md                            │
│  ├── 🔖 convex-security-audit.md                            │
│  └── 🔖 convex-component-authoring.md                       │
│                                                              │
│  [Browse on GitHub →]                                        │
└─────────────────────────────────────────────────────────────┘
```

## Navigation Updates

### Main Navigation

Add "Skills" to AI section dropdown:
- AI Overview
- MCP Server
- Vector Search
- **Skills** ← New
- Agents

### Footer Links

Add to footer under Resources:
- Documentation
- **AI Skills** ← New
- GitHub
- Discord

## Call to Action Updates

### Primary CTA

```
Build with AI on Convex
[Get Started] [View Skills]
```

### Secondary CTAs

```
Try the Skills:
- npx convex claude-init
- Browse skills on GitHub
```

## Implementation Notes

### For Convex Team

1. **Page updates are incremental** - Can be rolled out in phases
2. **Skills content is external** - Embedded from GitHub
3. **Consider analytics** - Track skill views and installs
4. **Mobile responsive** - Skills cards should stack on mobile

### Design Considerations

- Match existing convex.dev design system
- Use consistent card components
- Ensure accessibility for skill badges
- Add search/filter for skills when list grows

## Timeline Suggestion

1. Week 1: Add Skills section with links
2. Week 2: Add AI Tools integration section
3. Week 3: Implement interactive skills directory
4. Week 4: Add quick start commands section

## References

- Current page: https://convex.dev/ai
- Skills repo: https://github.com/get-convex/convex-skills
- Design system: Internal Convex design docs
