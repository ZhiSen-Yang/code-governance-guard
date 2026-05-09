#!/usr/bin/env node

const {
  backupExistingSkill,
  copyDirectory,
  ensureDirectory,
  parseArguments,
  resolveInstallPaths,
  showHelp
} = require("./install");

const SKILL_NAME = "code-governance-guard";

/**
 * Execute the command line entry. The command intentionally supports only the
 * install flow so package behavior stays predictable and auditable.
 */
function main() {
  const args = parseArguments(process.argv.slice(2));

  if (args.help || args.command !== "install") {
    showHelp();
    process.exit(args.help ? 0 : 1);
  }

  const paths = resolveInstallPaths({
    requestedPath: args.path,
    packageRoot: __dirname,
    skillName: SKILL_NAME
  });

  const actions = [
    `source: ${paths.sourceSkillDir}`,
    `target: ${paths.targetSkillDir}`,
    `dryRun: ${args.dryRun ? "true" : "false"}`,
    `force: ${args.force ? "true" : "false"}`
  ];

  console.log(`Installing ${SKILL_NAME}`);
  for (const action of actions) {
    console.log(`- ${action}`);
  }

  if (args.dryRun) {
    console.log("Dry run complete. No files were changed.");
    return;
  }

  ensureDirectory(paths.targetSkillsRoot);
  const backupPath = backupExistingSkill(paths.targetSkillDir, {
    force: args.force,
    skillName: SKILL_NAME
  });
  copyDirectory(paths.sourceSkillDir, paths.targetSkillDir);

  if (backupPath) {
    console.log(`Existing skill was backed up to: ${backupPath}`);
  }
  console.log(`Installed ${SKILL_NAME} to: ${paths.targetSkillDir}`);
  console.log(`Use $${SKILL_NAME} in a coding task to enable the guardrails.`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
