/**
 * File sync and dev server management for Convex OpenCode Plugin
 */

import { existsSync, watch } from "fs";
import { join } from "path";

interface SyncOptions {
  debounceMs?: number;
  autoFormat?: boolean;
}

const defaultSyncOptions: SyncOptions = {
  debounceMs: 1000,
  autoFormat: true,
};

/**
 * Setup file sync for Convex directory
 */
export async function setupFileSync(
  directory: string,
  options?: SyncOptions
): Promise<() => void> {
  const opts = { ...defaultSyncOptions, ...options };
  const convexDir = join(directory, "convex");

  if (!existsSync(convexDir)) {
    console.log("[convex-sync] No convex/ directory found");
    return () => {};
  }

  let debounceTimer: NodeJS.Timeout | null = null;

  const watcher = watch(convexDir, { recursive: true }, (eventType, filename) => {
    if (!filename) return;

    // Ignore _generated directory
    if (filename.includes("_generated")) {
      return;
    }

    // Debounce rapid changes
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      handleFileChange(convexDir, filename, eventType);
    }, opts.debounceMs);
  });

  console.log("[convex-sync] Watching convex/ directory");

  // Return cleanup function
  return () => {
    watcher.close();
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    console.log("[convex-sync] Stopped watching");
  };
}

/**
 * Handle file change in convex directory
 */
async function handleFileChange(
  convexDir: string,
  filename: string,
  eventType: string
): Promise<void> {
  console.log(`[convex-sync] ${eventType}: ${filename}`);

  // Schema changes trigger special handling
  if (filename === "schema.ts" || filename.endsWith("/schema.ts")) {
    await handleSchemaChange(convexDir);
  }

  // Function file changes
  if (filename.endsWith(".ts") && !filename.startsWith("_")) {
    await handleFunctionChange(convexDir, filename);
  }
}

/**
 * Handle schema.ts changes
 */
async function handleSchemaChange(convexDir: string): Promise<void> {
  console.log("[convex-sync] Schema changed, pushing...");
  
  // In real implementation, would trigger:
  // npx convex dev --once
  // or validate schema
}

/**
 * Handle function file changes
 */
async function handleFunctionChange(
  convexDir: string,
  filename: string
): Promise<void> {
  console.log(`[convex-sync] Function changed: ${filename}`);
  
  // In real implementation, would:
  // - Check for syntax errors
  // - Validate function signatures
  // - Auto-format if enabled
}

/**
 * Check if dev server is running
 */
export async function isDevServerRunning(): Promise<boolean> {
  // In real implementation, would check process or port
  return false;
}

/**
 * Start the dev server
 */
export async function startDevServer(directory: string): Promise<void> {
  console.log("[convex-sync] Starting dev server...");
  
  // In real implementation:
  // spawn("npx", ["convex", "dev"], { cwd: directory, detached: true })
}

/**
 * Stop the dev server
 */
export async function stopDevServer(): Promise<void> {
  console.log("[convex-sync] Stopping dev server...");
  
  // In real implementation, would kill the process
}

export default {
  setupFileSync,
  isDevServerRunning,
  startDevServer,
  stopDevServer,
};
