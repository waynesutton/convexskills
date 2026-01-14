/**
 * Deployment context injection for Convex OpenCode Plugin
 */

import { existsSync, readFileSync } from "fs";
import { join } from "path";

export interface ConvexContext {
  projectName: string;
  tables: string[];
  functions: FunctionInfo[];
  envVars: string[];
  schemaHash?: string;
}

export interface FunctionInfo {
  name: string;
  type: "query" | "mutation" | "action" | "httpAction";
  file: string;
  args?: string[];
}

/**
 * Check if directory contains a Convex project
 */
export async function checkForConvexDirectory(directory: string): Promise<boolean> {
  const convexDir = join(directory, "convex");
  return existsSync(convexDir);
}

/**
 * Get deployment context for the Convex project
 */
export async function getDeploymentContext(
  directory: string
): Promise<ConvexContext | null> {
  const convexDir = join(directory, "convex");

  if (!existsSync(convexDir)) {
    return null;
  }

  try {
    const context: ConvexContext = {
      projectName: getProjectName(directory),
      tables: await getTables(convexDir),
      functions: await getFunctions(convexDir),
      envVars: await getEnvVars(directory),
    };

    // Get schema hash for change detection
    const schemaPath = join(convexDir, "schema.ts");
    if (existsSync(schemaPath)) {
      const schemaContent = readFileSync(schemaPath, "utf-8");
      context.schemaHash = simpleHash(schemaContent);
    }

    return context;
  } catch (error) {
    console.error("[convex-context] Error getting deployment context:", error);
    return null;
  }
}

/**
 * Get project name from package.json
 */
function getProjectName(directory: string): string {
  const packagePath = join(directory, "package.json");
  
  if (existsSync(packagePath)) {
    try {
      const pkg = JSON.parse(readFileSync(packagePath, "utf-8"));
      return pkg.name || "convex-project";
    } catch {
      // Ignore parse errors
    }
  }
  
  return "convex-project";
}

/**
 * Extract table names from schema.ts
 */
async function getTables(convexDir: string): Promise<string[]> {
  const schemaPath = join(convexDir, "schema.ts");
  
  if (!existsSync(schemaPath)) {
    return [];
  }

  try {
    const content = readFileSync(schemaPath, "utf-8");
    
    // Simple regex to extract table names from defineTable calls
    // In production, would use proper TypeScript parsing
    const tableRegex = /(\w+):\s*defineTable\(/g;
    const tables: string[] = [];
    let match;
    
    while ((match = tableRegex.exec(content)) !== null) {
      tables.push(match[1]);
    }
    
    return tables;
  } catch {
    return [];
  }
}

/**
 * Extract function info from convex directory
 */
async function getFunctions(convexDir: string): Promise<FunctionInfo[]> {
  const functions: FunctionInfo[] = [];
  
  // In production, would scan all .ts files and parse function exports
  // For now, return empty array as placeholder
  
  return functions;
}

/**
 * Get environment variable names (not values)
 */
async function getEnvVars(directory: string): Promise<string[]> {
  const envPath = join(directory, ".env.local");
  
  if (!existsSync(envPath)) {
    return [];
  }

  try {
    const content = readFileSync(envPath, "utf-8");
    const lines = content.split("\n");
    
    return lines
      .filter((line) => line.trim() && !line.startsWith("#"))
      .map((line) => line.split("=")[0].trim())
      .filter((name) => name.length > 0);
  } catch {
    return [];
  }
}

/**
 * Simple hash function for change detection
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

export default {
  checkForConvexDirectory,
  getDeploymentContext,
};
