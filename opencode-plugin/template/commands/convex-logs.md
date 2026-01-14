# /convex-logs

Fetch and display recent Convex function logs.

## Usage

```
/convex-logs [options]
```

## Options

- `--limit <n>` - Number of log entries (default: 50)
- `--function <name>` - Filter by function name
- `--level <level>` - Filter by log level (info, warn, error)
- `--since <time>` - Logs since time (e.g., "1h", "30m")

## What This Command Does

1. Fetches recent function execution logs
2. Filters and formats log output
3. Highlights errors and warnings
4. Shows execution times

## Example Output

```
Fetching recent logs...

[2024-01-14 10:23:45] INFO  users.get (12ms)
  → userId: "abc123"
  ← { name: "John", email: "john@example.com" }

[2024-01-14 10:23:46] ERROR tasks.create (45ms)
  → { title: "", userId: "abc123" }
  ✕ ConvexError: Title cannot be empty

[2024-01-14 10:23:47] INFO  tasks.list (8ms)
  → userId: "abc123"
  ← [3 items]

Showing 3 of 50 logs. Use --limit to see more.
```

## Log Levels

- **INFO** - Successful function executions
- **WARN** - Non-fatal warnings
- **ERROR** - Function errors and exceptions

## Debugging Tips

1. Check for ConvexError messages
2. Look at execution times for performance
3. Review input arguments for issues
4. Use --function to focus on specific areas

## Notes

- Logs are from the development deployment by default
- Use `--prod` flag to view production logs
- Sensitive data may be redacted in logs
