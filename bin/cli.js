#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  copyFileSync,
  readdirSync,
} from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, "..");

const SKILLS = {
  "convex-best-practices":
    "Guidelines for building production-ready Convex apps",
  "convex-functions": "Writing queries, mutations, actions, and HTTP actions",
  "convex-realtime": "Patterns for building reactive applications",
  "convex-schema-validator": "Database schema definition and validation",
  "convex-file-storage": "File upload, storage, and serving",
  "convex-agents": "Building AI agents with Convex",
  "convex-cron-jobs": "Scheduled functions and background tasks",
  "convex-http-actions": "HTTP endpoints and webhook handling",
  "convex-migrations": "Schema evolution and data migrations",
  "convex-security-check": "Quick security audit checklist",
  "convex-security-audit": "Deep security review patterns",
  "convex-component-authoring": "Creating reusable Convex components",
};

function printHelp() {
  console.log(`
convex-skills - Agent skills for building Convex applications

USAGE:
  convex-skills <command> [options]

COMMANDS:
  list                    List all available skills
  install <skill>         Install a skill to .claude/skills/
  install-all             Install all skills to .claude/skills/
  install-templates       Install template files to your project
  path <skill>            Print the path to a skill file
  show <skill>            Print a skill's content

OPTIONS:
  --dir <path>            Target directory (default: current directory)
  --help, -h              Show this help message

EXAMPLES:
  convex-skills list
  convex-skills install convex-best-practices
  convex-skills install-all
  convex-skills install-templates
  convex-skills show convex-functions

AVAILABLE SKILLS:
${Object.entries(SKILLS)
  .map(([name, desc]) => `  ${name.padEnd(30)} ${desc}`)
  .join("\n")}
`);
}

function listSkills() {
  console.log("\nAvailable Convex Skills:\n");
  Object.entries(SKILLS).forEach(([name, desc]) => {
    console.log(`  ${name.padEnd(30)} ${desc}`);
  });
  console.log("");
}

function installSkill(skillName, targetDir) {
  const skillsPath = join(packageRoot, "skills", skillName, "SKILL.md");

  if (!existsSync(skillsPath)) {
    console.error(`Error: Skill not found: ${skillName}`);
    console.log("Run 'convex-skills list' to see available skills.");
    process.exit(1);
  }

  const targetPath = join(
    targetDir,
    ".claude",
    "skills",
    skillName,
    "SKILL.md",
  );
  const targetSkillDir = dirname(targetPath);

  if (!existsSync(targetSkillDir)) {
    mkdirSync(targetSkillDir, { recursive: true });
  }

  copyFileSync(skillsPath, targetPath);
  console.log(`Installed ${skillName} to ${targetPath}`);
}

function installAllSkills(targetDir) {
  const skillsDir = join(packageRoot, "skills");
  const skills = readdirSync(skillsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  console.log(`Installing ${skills.length} skills...\n`);

  skills.forEach((skillName) => {
    installSkill(skillName, targetDir);
  });

  console.log(
    `\nDone! Installed ${skills.length} skills to ${join(targetDir, ".claude", "skills")}`,
  );
}

function installTemplates(targetDir) {
  const templatesDir = join(packageRoot, "templates");

  // Install CLAUDE.md template
  const claudeTemplate = join(templatesDir, "CLAUDE.md");
  if (existsSync(claudeTemplate)) {
    const targetClaude = join(targetDir, "CLAUDE.md");
    if (!existsSync(targetClaude)) {
      copyFileSync(claudeTemplate, targetClaude);
      console.log(`Installed CLAUDE.md template`);
    } else {
      console.log(`Skipping CLAUDE.md (already exists)`);
    }
  }

  // Install skill templates
  const skillTemplatesDir = join(templatesDir, "skills");
  if (existsSync(skillTemplatesDir)) {
    const templates = readdirSync(skillTemplatesDir).filter((f) =>
      f.endsWith(".md"),
    );
    const targetSkillsDir = join(targetDir, ".claude", "skills");

    if (!existsSync(targetSkillsDir)) {
      mkdirSync(targetSkillsDir, { recursive: true });
    }

    templates.forEach((template) => {
      const src = join(skillTemplatesDir, template);
      const dest = join(targetSkillsDir, template);
      if (!existsSync(dest)) {
        copyFileSync(src, dest);
        console.log(`Installed template: ${template}`);
      } else {
        console.log(`Skipping ${template} (already exists)`);
      }
    });
  }

  console.log("\nDone!");
}

function showSkill(skillName) {
  const skillsPath = join(packageRoot, "skills", skillName, "SKILL.md");

  if (!existsSync(skillsPath)) {
    console.error(`Error: Skill not found: ${skillName}`);
    process.exit(1);
  }

  const content = readFileSync(skillsPath, "utf-8");
  console.log(content);
}

function printSkillPath(skillName) {
  const skillsPath = join(packageRoot, "skills", skillName, "SKILL.md");

  if (!existsSync(skillsPath)) {
    console.error(`Error: Skill not found: ${skillName}`);
    process.exit(1);
  }

  console.log(skillsPath);
}

// Parse arguments
const args = process.argv.slice(2);
let targetDir = process.cwd();

// Check for --dir flag
const dirIndex = args.indexOf("--dir");
if (dirIndex !== -1 && args[dirIndex + 1]) {
  targetDir = resolve(args[dirIndex + 1]);
  args.splice(dirIndex, 2);
}

const command = args[0];
const arg = args[1];

switch (command) {
  case "list":
    listSkills();
    break;
  case "install":
    if (!arg) {
      console.error("Error: Please specify a skill to install.");
      console.log("Run 'convex-skills list' to see available skills.");
      process.exit(1);
    }
    installSkill(arg, targetDir);
    break;
  case "install-all":
    installAllSkills(targetDir);
    break;
  case "install-templates":
    installTemplates(targetDir);
    break;
  case "show":
    if (!arg) {
      console.error("Error: Please specify a skill to show.");
      process.exit(1);
    }
    showSkill(arg);
    break;
  case "path":
    if (!arg) {
      console.error("Error: Please specify a skill.");
      process.exit(1);
    }
    printSkillPath(arg);
    break;
  case "--help":
  case "-h":
  case "help":
  case undefined:
    printHelp();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}
