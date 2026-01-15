import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync, readdirSync, existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get the path to the skills directory
 */
export function getSkillsPath() {
  return join(__dirname, "skills");
}

/**
 * Get the path to the templates directory
 */
export function getTemplatesPath() {
  return join(__dirname, "templates");
}

/**
 * List all available skills
 */
export function listSkills() {
  const skillsPath = getSkillsPath();
  const skills = readdirSync(skillsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  return skills;
}

/**
 * Get a skill's content by name
 */
export function getSkill(skillName) {
  const skillPath = join(getSkillsPath(), skillName, "SKILL.md");
  if (!existsSync(skillPath)) {
    throw new Error(`Skill not found: ${skillName}`);
  }
  return readFileSync(skillPath, "utf-8");
}

/**
 * Get the path to a specific skill
 */
export function getSkillPath(skillName) {
  return join(getSkillsPath(), skillName, "SKILL.md");
}

/**
 * Available skills with descriptions
 */
export const SKILLS = {
  "convex-best-practices": "Guidelines for building production-ready Convex apps",
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

export default {
  getSkillsPath,
  getTemplatesPath,
  listSkills,
  getSkill,
  getSkillPath,
  SKILLS,
};
