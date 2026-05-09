# Safety Rules

Use these rules when a task involves rollback, deletion, cleanup, database mutation, backups, or high-risk automation.

## Git Rollback

Default stance: do not rollback or discard current work.

Blocked unless explicitly authorized with backup and second confirmation:

1. `git reset --hard`
2. `git checkout -- .`
3. `git restore .`
4. `git clean -fd`
5. `git clean -fdx`
6. Bulk replacement from another branch, commit, remote, archive, or generated output

Required rollback workflow:

1. Inspect state with `git status --short` or a project-equivalent file status check.
2. Identify every file that may be overwritten or removed.
3. Back up current work using a patch, copied backup directory, stash only when explicitly approved, or temporary branch.
4. Show the exact command or file operation to be executed.
5. Ask the user for second confirmation.
6. Execute only the approved scope.
7. Verify the result and report the backup location.

## Delete Commands

Absolute bans:

1. Do not delete the whole project directory.
2. Do not delete the repository root.
3. Do not delete `.git`.
4. Do not recursively delete dynamically computed paths unless the resolved absolute paths have been displayed and verified.
5. Do not delete production configuration, secrets, database files, or user data without explicit authorization and backup.

Controlled commands include `rm`, `Remove-Item`, `del`, `rmdir`, `git clean`, cleanup scripts, package scripts, and generated code that deletes files.

Required delete workflow:

1. Resolve absolute target paths.
2. Verify targets are inside the intended workspace or explicitly named target directory.
3. Explain why deletion is needed.
4. Explain impact and recovery.
5. Create a backup when the data is not trivially reproducible.
6. Ask for second confirmation.
7. Prefer narrow deletion over recursive deletion.

## Database Operations

Do not execute these commands directly:

1. `DROP DATABASE`
2. `DROP TABLE`
3. `TRUNCATE`
4. Unconditional `DELETE`
5. Unconditional `UPDATE`
6. Collection clearing
7. Migration-history deletion
8. Database-file deletion
9. Index clearing when it can affect availability or data integrity

Safe response pattern for requested database cleanup:

1. Identify environment: local, development, test, staging, or production.
2. Require a backup first.
3. Convert destructive intent into a reviewable script.
4. Preview impact with `SELECT`, count queries, dry-run mode, or transaction rollback.
5. Require a bounded `WHERE` clause for mutation statements.
6. Wrap in a transaction where the database supports it.
7. Provide rollback steps.
8. Ask for second confirmation before execution.

## Backup Options

Choose the smallest reliable backup:

1. Git patch for tracked text changes.
2. Temporary branch for broad repository state.
3. Copied backup directory for non-git or binary files.
4. Database dump or snapshot for database changes.
5. Exported data file for table-level changes.

Report backup paths and recovery commands in the final response.
