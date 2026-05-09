# Alibaba Code Style

Apply project-local linters and conventions first. Use these rules to fill gaps.

## General Code

1. Names must express business meaning.
2. Avoid pinyin, meaningless abbreviations, and mixed naming styles.
3. Keep methods short and single-purpose.
4. Avoid deep nesting; use guard clauses when they improve clarity.
5. Keep constants named and close to the correct ownership boundary.
6. Do not leave unused variables, unused imports, dead branches, debug logs, or placeholder code.
7. Avoid over-abstraction; extract only when it removes real duplication or clarifies ownership.

## Comments

Required comments:

1. Public APIs and externally consumed methods need method-level comments.
2. Complex business methods need method-level comments.
3. Algorithms and non-obvious data transformations need method-level comments.
4. Complex branches, compatibility logic, risk controls, permission checks, and transaction boundaries need block-level comments.

Comment quality rules:

1. Explain business intent, constraints, risk, or why a choice exists.
2. Do not restate obvious code behavior.
3. Remove stale comments when code changes.
4. Do not add decorative or template comments.
5. Keep comments in readable Chinese or the project's established language.

## Java Backend

1. Follow Alibaba Java coding manual principles for naming, constants, collections, concurrency, exceptions, logging, tests, and security.
2. Keep Controller, Service, Repository, DTO, VO, Entity, and Enum responsibilities separate.
3. Validate external input at boundaries.
4. Use explicit request and response models for non-trivial APIs.
5. Avoid raw `Map` for complex business responses.
6. Avoid SQL injection with parameterized statements or ORM-safe APIs.
7. Define transaction boundaries at service-level business operations.
8. Log key context and avoid secrets, tokens, passwords, and personal data.
9. Cover core, boundary, and exception branches with tests when the change is risky or shared.

## Frontend

1. Follow project ESLint, Stylelint, Prettier, TypeScript, and component library conventions.
2. Keep components single-purpose.
3. Keep state ownership explicit.
4. Avoid implicit side effects in render paths.
5. Avoid broad `any`; model data and callbacks with precise types.
6. Handle form validation, async requests, error states, empty states, loading states, disabled states, and permission states.
7. Reuse design tokens, shared components, hooks, utilities, and service clients.
8. Avoid hard-coded layout constants when the design system provides a token.
9. Keep accessibility basics: labels, focus states, keyboard reachability, semantic elements, and contrast.

## Review Checklist

Before finalizing:

1. Search for existing implementation before adding a new utility or component.
2. After every code change, run the strongest available verification command: dependency install when dependencies changed, build or compile, type check, linter, and tests. Use commands such as `npm install`, `npm run build`, `npm test`, `mvn test`, `mvn package`, `gradle build`, `go test ./...`, or `cargo test` according to the project.
3. Remove redundant code introduced during the task.
4. Check comments are accurate and useful.
5. Report verification results and any remaining risk.
