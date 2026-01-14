# Future Convex Skills Exploration

This document explores potential future skills that could help developers build with Convex.

## Potential Skills to Develop

### 1. Convex Search

Full-text and vector search patterns for Convex applications.

**Topics to cover:**
- Full-text search indexes
- Vector embeddings and similarity search
- Hybrid search strategies
- Search result ranking
- Faceted search implementation

**Documentation:** https://docs.convex.dev/search

---

### 2. Convex Cron Jobs

Scheduled function patterns for background tasks.

**Topics to cover:**
- Cron expression syntax
- Interval-based scheduling
- Job retry strategies
- Monitoring scheduled jobs
- Best practices for long-running tasks

**Documentation:** https://docs.convex.dev/scheduling/cron-jobs

---

### 3. Convex HTTP Actions

External API integration and webhook handling.

**Topics to cover:**
- HTTP endpoint routing
- Request/response handling
- Authentication for HTTP actions
- CORS configuration
- Webhook signature validation

**Documentation:** https://docs.convex.dev/functions/http-actions

---

### 4. Convex Pagination

Cursor-based pagination for large datasets.

**Topics to cover:**
- Cursor-based vs offset pagination
- usePaginatedQuery hook
- Infinite scroll implementation
- Performance optimization
- Pagination state management

**Documentation:** https://docs.convex.dev/database/pagination

---

### 5. Convex Migrations

Schema migration strategies for evolving applications.

**Topics to cover:**
- Adding new fields (optional first)
- Backfilling data
- Removing deprecated fields
- Index migrations
- Zero-downtime migrations

**Documentation:** https://docs.convex.dev/database/schemas

---

### 6. Convex Testing

Unit and integration testing patterns.

**Topics to cover:**
- Testing queries and mutations
- Mocking Convex context
- Integration test setup
- Test data seeding
- CI/CD integration

**Documentation:** https://docs.convex.dev/testing

---

### 7. Convex Rate Limiting

Rate limiting patterns for API protection.

**Topics to cover:**
- Token bucket algorithm
- Sliding window counters
- Per-user rate limits
- Global rate limits
- Rate limit response handling

---

### 8. Convex Multi-tenancy

Multi-tenant architecture patterns.

**Topics to cover:**
- Tenant isolation strategies
- Shared vs dedicated tables
- Cross-tenant queries
- Tenant-specific configuration
- Data partitioning

---

### 9. Convex Webhooks

Outbound webhook patterns for integrations.

**Topics to cover:**
- Webhook event design
- Retry logic for failed webhooks
- Webhook signature generation
- Idempotency handling
- Webhook delivery tracking

---

### 10. Convex Streaming

Real-time streaming patterns beyond subscriptions.

**Topics to cover:**
- Server-sent events
- WebSocket alternatives
- Stream backpressure
- Connection management
- Reconnection strategies

---

## Skills from Claude Skills Ecosystem

Based on review of [awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) and [Anthropic Skills](https://platform.claude.com/docs/en/api/beta/skills):

### Additional Skill Ideas

1. **Convex + Clerk Integration** - Authentication patterns with Clerk
2. **Convex + Stripe Integration** - Payment processing patterns
3. **Convex + Resend Integration** - Email sending patterns
4. **Convex + OpenAI Integration** - AI feature patterns
5. **Convex Performance Optimization** - Query and mutation optimization
6. **Convex Error Recovery** - Graceful error handling patterns
7. **Convex Data Validation** - Advanced validation patterns
8. **Convex Audit Logging** - Comprehensive audit trail patterns
9. **Convex Feature Flags** - Feature flag implementation
10. **Convex A/B Testing** - Experiment patterns

---

## Prioritization Matrix

| Skill | Developer Impact | Implementation Effort | Priority |
|-------|-----------------|----------------------|----------|
| Convex Search | High | Medium | P1 |
| Convex Cron Jobs | High | Low | P1 |
| Convex Pagination | High | Low | P1 |
| Convex HTTP Actions | Medium | Low | P2 |
| Convex Testing | High | Medium | P2 |
| Convex Migrations | Medium | Medium | P2 |
| Convex Rate Limiting | Medium | Medium | P3 |
| Convex Multi-tenancy | Low | High | P3 |
| Convex Webhooks | Medium | Medium | P3 |
| Convex Streaming | Low | Medium | P3 |

---

## Next Steps

1. Review with Convex team for prioritization
2. Gather community feedback on desired skills
3. Identify documentation gaps to address
4. Create skill templates for each new skill
5. Schedule implementation sprints

---

## References

- Awesome Claude Skills: https://github.com/travisvn/awesome-claude-skills
- Claude API Skills: https://platform.claude.com/docs/en/api/beta/skills
- How to Create Custom Skills: https://support.claude.com/en/articles/12512198-how-to-create-custom-skills
- Convex Documentation: https://docs.convex.dev/
