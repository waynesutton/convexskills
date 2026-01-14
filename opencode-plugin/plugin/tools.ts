/**
 * Custom Convex tools for OpenCode agents
 */

export interface Tool {
  name: string;
  description: string;
  parameters: Record<string, ToolParameter>;
  handler: (args: Record<string, unknown>) => Promise<unknown>;
}

export interface ToolParameter {
  type: string;
  description: string;
  required?: boolean;
}

/**
 * Analyze schema and suggest improvements
 */
const convexSchemaSuggest: Tool = {
  name: "convex_schema_suggest",
  description: "Analyzes current Convex schema and suggests improvements based on query patterns in the codebase",
  parameters: {
    schemaPath: {
      type: "string",
      description: "Path to schema.ts file",
      required: false,
    },
  },
  handler: async (args) => {
    const schemaPath = args.schemaPath as string || "convex/schema.ts";
    
    // In production, would:
    // 1. Parse schema.ts
    // 2. Scan query files for withIndex usage
    // 3. Identify missing indexes
    // 4. Suggest optimizations
    
    return {
      suggestions: [
        {
          type: "missing_index",
          table: "example",
          field: "userId",
          reason: "Query uses filter on userId without index",
        },
      ],
      analyzed: true,
    };
  },
};

/**
 * Run a Convex function with test arguments
 */
const convexFunctionTest: Tool = {
  name: "convex_function_test",
  description: "Runs a Convex function with test arguments and returns formatted results",
  parameters: {
    functionName: {
      type: "string",
      description: "Full function name (e.g., 'users.get')",
      required: true,
    },
    args: {
      type: "object",
      description: "Arguments to pass to the function",
      required: false,
    },
  },
  handler: async (args) => {
    const functionName = args.functionName as string;
    const functionArgs = args.args as Record<string, unknown> || {};
    
    // In production, would use Convex MCP server to run the function
    // npx convex run <functionName> <args>
    
    return {
      function: functionName,
      args: functionArgs,
      result: null,
      error: null,
      executionTime: 0,
    };
  },
};

/**
 * Generate migration plan for schema changes
 */
const convexMigrationPlan: Tool = {
  name: "convex_migration_plan",
  description: "Given a schema change, generates a migration strategy including backfill approach",
  parameters: {
    currentSchema: {
      type: "string",
      description: "Current schema definition",
      required: true,
    },
    newSchema: {
      type: "string",
      description: "New schema definition",
      required: true,
    },
  },
  handler: async (args) => {
    const currentSchema = args.currentSchema as string;
    const newSchema = args.newSchema as string;
    
    // In production, would:
    // 1. Parse both schemas
    // 2. Identify differences
    // 3. Categorize changes (additive, breaking, etc.)
    // 4. Generate migration steps
    
    return {
      changes: [],
      breakingChanges: [],
      migrationSteps: [
        {
          step: 1,
          action: "Add new optional field",
          code: "// Example migration code",
        },
        {
          step: 2,
          action: "Backfill data",
          code: "// Example backfill mutation",
        },
        {
          step: 3,
          action: "Make field required",
          code: "// Example schema update",
        },
      ],
      estimatedDowntime: "0 seconds (zero-downtime migration)",
    };
  },
};

/**
 * Check Convex deployment status
 */
const convexDeploymentStatus: Tool = {
  name: "convex_deployment_status",
  description: "Check the status of Convex deployment and dev server",
  parameters: {},
  handler: async () => {
    // In production, would check:
    // 1. Dev server running status
    // 2. Deployment health
    // 3. Recent function errors
    
    return {
      devServerRunning: false,
      deploymentStatus: "unknown",
      lastDeployment: null,
      recentErrors: [],
    };
  },
};

/**
 * All custom Convex tools
 */
export const convexTools: Tool[] = [
  convexSchemaSuggest,
  convexFunctionTest,
  convexMigrationPlan,
  convexDeploymentStatus,
];

export default convexTools;
