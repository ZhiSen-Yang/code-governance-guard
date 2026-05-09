---
name: code-governance-guard
description: Enforce global coding guardrails for the current conversation when Codex writes, edits, reviews, refactors, tests, builds, or executes code-related commands. Use for git rollback safety, delete-command confirmation, database destructive-operation prevention, Chinese mojibake repair without Unicode escaping, Alibaba coding standards, redundancy cleanup, and frontend work that must follow ui-ux-pro-max quality rules.
---

# Code Governance Guard

Apply this skill after it is triggered for every code-related action in the current conversation until the user explicitly disables or replaces these rules.

## Priority

Follow this priority order:

1. System and developer instructions.
2. Explicit user authorization for the current task.
3. This skill's safety bans and confirmation workflow.
4. Existing project rules, Alibaba coding standards, and UI rules.
5. General engineering best practices.

When a request conflicts with a safety ban, refuse the unsafe execution path and offer a safer review, backup, patch, dry-run, or manual procedure.

## Mandatory Safety Rules

Never silently discard user work. Before touching files, inspect the relevant context and preserve unrelated changes.

Do not run destructive git rollback commands by default, including `git reset --hard`, `git checkout -- .`, `git restore .`, `git clean -fd`, `git clean -fdx`, or any bulk restore to a historical branch, commit, or remote state.

If rollback is explicitly required:

1. Run `git status` or the project equivalent.
2. List affected files and the exact rollback target.
3. Create a backup first, such as a patch, backup directory, or temporary branch.
4. Explain the command, impact, and recovery path.
5. Ask for second confirmation before executing.

Never delete the whole project, repository root, `.git` directory, production configuration, secrets, database files, or user data.

Before any delete command or script-level delete:

1. Show the absolute target path.
2. Verify the resolved path is inside the intended workspace.
3. Explain the reason, scope, and impact.
4. Provide a backup or recovery plan.
5. Ask for second confirmation before executing.

Do not execute database deletion or clearing commands by default, including `DROP DATABASE`, `DROP TABLE`, `TRUNCATE`, unconditional `DELETE`, unconditional `UPDATE`, migration-history deletion, database-file deletion, collection clearing, or index clearing. For requested cleanup, provide a reviewed script or manual plan with environment confirmation, backup, dry-run or `SELECT` impact preview, transaction boundaries, rollback plan, and second confirmation.

Read `references/safety-rules.md` when a task involves git rollback, delete commands, cleanup, database mutation, backups, or high-risk automation.

## Chinese Text And Encoding

Use readable Chinese characters directly. Do not replace Chinese text with Unicode escape sequences. Create and edit text files as UTF-8 unless the project requires another explicit encoding.

When fixing mojibake:

1. Identify likely source encoding, file encoding, terminal encoding, and read/write path.
2. Preserve the original with a backup or patch before irreversible replacement.
3. Restore correct Chinese terms and keep business wording consistent.
4. Reopen or verify the file after writing.

## Alibaba Coding Standards

Follow existing project linters and conventions first, then apply Alibaba Java and frontend coding principles:

1. Use clear business names; avoid pinyin, meaningless abbreviations, and mixed naming styles.
2. Keep methods and components single-purpose with controlled complexity.
3. Handle exceptions explicitly; do not swallow errors.
4. Log useful context without secrets or sensitive data.
5. Replace magic values with named constants when that improves clarity.
6. Validate inputs, nullability, boundaries, and permission states.
7. Add method-level comments for exposed methods, complex business methods, and algorithms.
8. Add block-level comments for complex branches, compatibility logic, critical workflow steps, and risk points.
9. Comments must explain intent, constraints, or reasons; remove stale or noisy comments.

Read `references/alibaba-code-style.md` when implementing Java, backend APIs, frontend components, shared libraries, tests, or review feedback.

## Redundancy Control

Before adding code, search for existing utilities, components, services, types, and patterns. Reuse local abstractions when they fit.

Remove or avoid unused imports, unused variables, dead code, stale comments, duplicated branches, placeholder implementations, and unnecessary dependencies. Extract duplication only when it improves maintainability and matches the existing design.

After every code change, run the strongest available project verification before finishing. Prefer the project's documented commands, such as dependency install checks, build, compile, type check, lint, and tests. Typical examples include `npm install` or the package-manager equivalent when dependencies changed, `npm run build`, `npm test`, `mvn test`, `mvn package`, `gradle build`, `go test ./...`, `cargo test`, or framework-specific compile commands. If verification cannot run because the environment, dependency source, credentials, runtime, or user instruction blocks it, state the exact reason and remaining risk.

## Frontend UI Work

For frontend generation, component work, page design, or interaction changes, apply `ui-ux-pro-max` if available. If it is not installed or cannot be loaded, state that and use the fallback quality rules in `references/frontend-ui-rules.md`.

Frontend output must cover real workflows and include responsive layout, accessibility, loading states, empty states, error states, disabled states, and permission states when relevant.

## Execution Checklist

Before finishing a code task, confirm:

1. No unsafe rollback, deletion, or database destructive command was executed without the required backup and second confirmation.
2. Chinese text is readable Chinese, not Unicode-escaped replacement text.
3. New or changed code follows project conventions and Alibaba-style naming, structure, comments, and error handling.
4. Redundant code and stale artifacts introduced by the task were removed.
5. Frontend work followed `ui-ux-pro-max` or the documented fallback rules.
6. Post-change verification was run with the strongest available install, build, compile, type-check, lint, or test command, or the exact blocker was clearly reported.
