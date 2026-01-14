# /convex-init

Initialize Convex in the current project.

## Usage

```
/convex-init
```

## What This Command Does

1. Checks if Convex is already initialized
2. If not, runs `npm create convex` to set up Convex
3. Creates the `convex/` directory structure
4. Sets up `convex/schema.ts` with a basic schema
5. Configures the project for development

## Steps

1. **Check existing setup**
   - Look for `convex/` directory
   - Check for convex in package.json dependencies

2. **Initialize Convex**
   ```bash
   npm create convex@latest
   ```

3. **Create basic schema**
   - Generate `convex/schema.ts` with example tables

4. **Start dev server**
   - Optionally start `npx convex dev`

## Example Output

```
Checking for existing Convex setup...
No Convex found. Initializing...

Running: npm create convex@latest

Created convex/ directory
Created convex/schema.ts
Created convex/functions.ts

Convex initialized successfully!

Next steps:
1. Define your schema in convex/schema.ts
2. Run `npx convex dev` to start development
3. Use the Convex dashboard at https://dashboard.convex.dev
```

## Notes

- This command will NOT run if Convex is already initialized
- Always review the generated schema before pushing
- Configure authentication separately after initialization
