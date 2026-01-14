#!/usr/bin/env node
/**
 * Installation script for Convex OpenCode Plugin
 * 
 * Usage: npx convex-opencode install
 */

import { existsSync, mkdirSync, copyFileSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface InstallOptions {
  force?: boolean;
  skipConfig?: boolean;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "install":
      await install({
        force: args.includes("--force"),
        skipConfig: args.includes("--skip-config"),
      });
      break;
    case "uninstall":
      await uninstall();
      break;
    case "help":
    default:
      showHelp();
  }
}

async function install(options: InstallOptions): Promise<void> {
  console.log("Installing Convex OpenCode Plugin...\n");

  const cwd = process.cwd();
  const templateDir = join(__dirname, "..", "template");

  // Check if already installed
  const opencodeConfigPath = join(cwd, "opencode.json");
  if (existsSync(opencodeConfigPath) && !options.force) {
    console.log("opencode.json already exists. Use --force to overwrite.");
    return;
  }

  // Create directories
  const agentsDir = join(cwd, ".opencode", "agents");
  const commandsDir = join(cwd, ".opencode", "commands");

  if (!existsSync(agentsDir)) {
    mkdirSync(agentsDir, { recursive: true });
    console.log("Created .opencode/agents/");
  }

  if (!existsSync(commandsDir)) {
    mkdirSync(commandsDir, { recursive: true });
    console.log("Created .opencode/commands/");
  }

  // Copy template files
  if (!options.skipConfig) {
    const configSource = join(templateDir, "opencode.json");
    if (existsSync(configSource)) {
      copyFileSync(configSource, opencodeConfigPath);
      console.log("Created opencode.json");
    }
  }

  // Copy agent templates
  const agentFiles = ["convex-build.md", "convex-debug.md"];
  for (const file of agentFiles) {
    const source = join(templateDir, "agents", file);
    const dest = join(agentsDir, file);
    if (existsSync(source)) {
      copyFileSync(source, dest);
      console.log(`Created .opencode/agents/${file}`);
    }
  }

  // Copy command templates
  const commandFiles = ["convex-init.md", "convex-deploy.md", "convex-logs.md"];
  for (const file of commandFiles) {
    const source = join(templateDir, "commands", file);
    const dest = join(commandsDir, file);
    if (existsSync(source)) {
      copyFileSync(source, dest);
      console.log(`Created .opencode/commands/${file}`);
    }
  }

  // Update .gitignore if needed
  const gitignorePath = join(cwd, ".gitignore");
  if (existsSync(gitignorePath)) {
    const gitignore = readFileSync(gitignorePath, "utf-8");
    if (!gitignore.includes(".opencode/")) {
      writeFileSync(gitignorePath, gitignore + "\n# OpenCode\n.opencode/\n");
      console.log("Updated .gitignore");
    }
  }

  console.log("\nConvex OpenCode Plugin installed successfully!");
  console.log("\nNext steps:");
  console.log("1. Open your project in OpenCode");
  console.log("2. The plugin will auto-detect your Convex project");
  console.log("3. Use /convex-init, /convex-deploy, /convex-logs commands");
}

async function uninstall(): Promise<void> {
  console.log("Uninstalling Convex OpenCode Plugin...\n");

  const cwd = process.cwd();

  // Remove files
  const filesToRemove = [
    join(cwd, ".opencode", "agents", "convex-build.md"),
    join(cwd, ".opencode", "agents", "convex-debug.md"),
    join(cwd, ".opencode", "commands", "convex-init.md"),
    join(cwd, ".opencode", "commands", "convex-deploy.md"),
    join(cwd, ".opencode", "commands", "convex-logs.md"),
  ];

  for (const file of filesToRemove) {
    if (existsSync(file)) {
      // In production, would use fs.unlinkSync
      console.log(`Would remove: ${file}`);
    }
  }

  console.log("\nNote: opencode.json not removed. Remove manually if needed.");
}

function showHelp(): void {
  console.log(`
Convex OpenCode Plugin

Usage:
  npx convex-opencode <command> [options]

Commands:
  install     Install the plugin in current directory
  uninstall   Remove plugin files
  help        Show this help message

Options:
  --force       Overwrite existing files
  --skip-config Don't create opencode.json

Examples:
  npx convex-opencode install
  npx convex-opencode install --force
  npx convex-opencode uninstall
`);
}

main().catch(console.error);
