# /convex-deploy

Deploy Convex to production with confirmation.

## Usage

```
/convex-deploy
```

## What This Command Does

1. Validates schema and functions
2. Shows deployment diff
3. Requires confirmation before deploying
4. Runs `npx convex deploy`

## Pre-deployment Checks

1. **Schema validation**
   - Verify schema.ts is valid
   - Check for breaking changes

2. **Function validation**
   - Ensure all functions have validators
   - Check for syntax errors

3. **Security review**
   - Verify internal functions are protected
   - Check authentication requirements

## Confirmation Required

Before deploying, you must confirm:

```
Ready to deploy to production.

Changes detected:
- Modified: convex/users.ts (2 functions)
- Added: convex/tasks.ts (4 functions)
- Schema: 1 new table, 2 new indexes

This will affect your production deployment.
Type 'yes' to confirm: 
```

## Example Output

```
Validating schema...
Validating functions...
Checking for breaking changes...

Deployment Preview:
+ users.create (mutation)
+ users.get (query)
~ tasks.list (modified)

No breaking changes detected.

Type 'yes' to deploy: yes

Deploying to production...
Deployment successful!

Dashboard: https://dashboard.convex.dev/d/your-project
```

## Safety Notes

- This command requires explicit confirmation
- Breaking schema changes will require migration
- Always test in development before deploying
- Consider using preview deployments first
