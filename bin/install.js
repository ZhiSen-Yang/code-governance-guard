const fs = require("fs");
const os = require("os");
const path = require("path");

/**
 * Parse command line arguments for the installer.
 *
 * @param {string[]} argv command line arguments after the executable name.
 * @returns {{command: string, path?: string, dryRun: boolean, force: boolean, help: boolean}}
 */
function parseArguments(argv) {
  const result = {
    command: argv[0],
    dryRun: false,
    force: false,
    help: false
  };

  for (let index = 1; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--dry-run") {
      result.dryRun = true;
      continue;
    }
    if (value === "--force") {
      result.force = true;
      continue;
    }
    if (value === "--help" || value === "-h") {
      result.help = true;
      continue;
    }
    if (value === "--path") {
      const nextValue = argv[index + 1];
      if (!nextValue) {
        throw new Error("--path requires a value.");
      }
      result.path = nextValue;
      index += 1;
      continue;
    }
    if (value.startsWith("--path=")) {
      result.path = value.slice("--path=".length);
      continue;
    }
    throw new Error(`Unknown argument: ${value}`);
  }

  return result;
}

/**
 * Resolve source and destination paths without touching the file system.
 *
 * @param {{requestedPath?: string, packageRoot: string, skillName: string}} options path options.
 * @returns {{sourceSkillDir: string, targetSkillsRoot: string, targetSkillDir: string}}
 */
function resolveInstallPaths(options) {
  const packageRoot = findPackageRoot(options.packageRoot);
  const targetSkillsRoot = path.resolve(resolveSkillsRoot(options.requestedPath));

  return {
    sourceSkillDir: path.join(packageRoot, "skill"),
    targetSkillsRoot,
    targetSkillDir: path.join(targetSkillsRoot, options.skillName)
  };
}

/**
 * Create a directory recursively when it does not already exist.
 *
 * @param {string} directory absolute or relative directory path.
 */
function ensureDirectory(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

/**
 * Back up an existing skill directory. Existing directories are never silently
 * overwritten, even with --force.
 *
 * @param {string} targetSkillDir destination skill directory.
 * @param {{force: boolean, skillName: string}} options backup options.
 * @returns {string | undefined} backup path when a backup was created.
 */
function backupExistingSkill(targetSkillDir, options) {
  if (!fs.existsSync(targetSkillDir)) {
    return undefined;
  }

  if (!options.force) {
    throw new Error(
      `${options.skillName} already exists at ${targetSkillDir}. Re-run with --force to create a backup and replace it.`
    );
  }

  const backupPath = `${targetSkillDir}.backup-${formatTimestamp(new Date())}`;
  fs.renameSync(targetSkillDir, backupPath);
  return backupPath;
}

/**
 * Recursively copy a directory. File contents are copied as bytes so UTF-8
 * Chinese text is preserved exactly.
 *
 * @param {string} source source directory.
 * @param {string} target target directory.
 */
function copyDirectory(source, target) {
  const stat = fs.statSync(source);
  if (!stat.isDirectory()) {
    throw new Error(`Source is not a directory: ${source}`);
  }

  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
      continue;
    }
    if (entry.isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
      continue;
    }
    throw new Error(`Unsupported file type: ${sourcePath}`);
  }
}

/**
 * Print the installer help text.
 */
function showHelp() {
  console.log(`Usage:
  code-governance-guard install [--path <skills-dir>] [--dry-run] [--force]

Options:
  --path <skills-dir>  Install into a specific Codex skills directory.
  --dry-run            Show the planned operation without changing files.
  --force              Back up and replace an existing installed skill.
  --help, -h           Show this help message.`);
}

/**
 * Resolve the Codex skills root according to documented precedence.
 *
 * @param {string | undefined} requestedPath explicit --path value.
 * @returns {string} skills root path.
 */
function resolveSkillsRoot(requestedPath) {
  if (requestedPath) {
    return requestedPath;
  }
  if (process.env.CODEX_HOME) {
    return path.join(process.env.CODEX_HOME, "skills");
  }
  return path.join(os.homedir(), ".codex", "skills");
}

/**
 * Find the package root by walking upward from the binary directory. This keeps
 * the installer independent from the user's current working directory.
 *
 * @param {string} startDirectory starting directory.
 * @returns {string} package root path.
 */
function findPackageRoot(startDirectory) {
  let current = path.resolve(startDirectory);
  while (true) {
    const packagePath = path.join(current, "package.json");
    const skillPath = path.join(current, "skill", "SKILL.md");
    if (fs.existsSync(packagePath) && fs.existsSync(skillPath)) {
      return current;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      return path.resolve(__dirname, "..");
    }
    current = parent;
  }
}

/**
 * Format a timestamp for filesystem-safe backup directory names.
 *
 * @param {Date} date date to format.
 * @returns {string} timestamp string.
 */
function formatTimestamp(date) {
  return date.toISOString().replace(/[:.]/g, "-");
}

module.exports = {
  backupExistingSkill,
  copyDirectory,
  ensureDirectory,
  parseArguments,
  resolveInstallPaths,
  showHelp
};
