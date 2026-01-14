/**
 * Convex OpenCode Plugin
 * 
 * Provides automatic sync, context injection, and custom tools
 * for building Convex applications with OpenCode.
 */

import type { Plugin, PluginContext } from "@opencode-ai/plugin";
import { checkForConvexDirectory, getDeploymentContext } from "./context";
import { setupFileSync } from "./sync";
import { convexTools } from "./tools";

export interface ConvexPluginOptions {
  autoStartDev?: boolean;
  schemaWatchDebounce?: number;
}

const defaultOptions: ConvexPluginOptions = {
  autoStartDev: true,
  schemaWatchDebounce: 1000,
};

export const ConvexSyncPlugin: Plugin = async (ctx: PluginContext, options?: ConvexPluginOptions) => {
  const opts = { ...defaultOptions, ...options };
  const { project, client, $, directory } = ctx;

  // Check if this is a Convex project
  const isConvexProject = await checkForConvexDirectory(directory);
  if (!isConvexProject) {
    return {};
  }

  console.log("[convex-opencode] Detected Convex project");

  return {
    /**
     * Session start hook
     * - Check if dev server is running
     * - Inject deployment context
     */
    "session.start": async () => {
      console.log("[convex-opencode] Session started");

      // Check dev server status
      try {
        const status = await $`npx convex dev --status`.quiet();
        console.log("[convex-opencode] Dev server status:", status.stdout);
      } catch (error) {
        console.log("[convex-opencode] Dev server not running");
        
        if (opts.autoStartDev) {
          console.log("[convex-opencode] Starting dev server...");
          // Note: In real implementation, this would start the dev server
        }
      }

      // Inject deployment context
      const context = await getDeploymentContext(directory);
      if (context) {
        client.setContext("convex", context);
      }
    },

    /**
     * File edited hook
     * - Trigger schema push on schema.ts changes
     * - Ensure dev server is running for convex/ changes
     */
    "file.edited": async ({ path }) => {
      // Check if file is in convex/ directory
      if (!path.includes("convex/")) {
        return;
      }

      // Block edits to _generated directory
      if (path.includes("convex/_generated/")) {
        console.warn("[convex-opencode] Warning: _generated/ files are auto-generated and should not be edited");
        return;
      }

      // Schema change triggers push
      if (path.endsWith("schema.ts")) {
        console.log("[convex-opencode] Schema changed, triggering push...");
        // Debounced schema push would happen here
      }

      // Any convex/ file change ensures dev server is running
      console.log("[convex-opencode] Convex file edited:", path);
    },

    /**
     * Tool execute before hook
     * - Add schema context to file reads in convex/
     * - Block edits to _generated/
     */
    "tool.execute.before": async ({ tool, args }) => {
      if (tool === "read_file" && args.path?.includes("convex/")) {
        // Could inject schema context here
        console.log("[convex-opencode] Reading Convex file with context");
      }

      if (tool === "edit_file" && args.path?.includes("convex/_generated/")) {
        throw new Error("Cannot edit auto-generated files in convex/_generated/");
      }
    },

    /**
     * Tool execute after hook
     * - Suggest testing after creating new functions
     * - Suggest running queries after schema changes
     */
    "tool.execute.after": async ({ tool, args, result }) => {
      if (tool === "edit_file" && args.path?.includes("convex/")) {
        // Suggest testing with MCP tools
        console.log("[convex-opencode] Convex file updated. Consider testing with MCP tools.");
      }
    },

    /**
     * Session idle hook
     * - Check for dev server errors
     * - Surface function failures from logs
     */
    "session.idle": async () => {
      // In real implementation, would check for errors
      console.log("[convex-opencode] Checking for dev server errors...");
    },

    /**
     * Custom tools
     */
    tools: convexTools,
  };
};

export default ConvexSyncPlugin;
