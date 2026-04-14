## Code Quality and Development Tooling Changes

This project now includes a standardized development workflow focused on code consistency, formatting, and commit validation.

The main additions are:

- `ESLint` configured using modern flat configuration.
- `Prettier` integration for automatic formatting.
- `Husky` git hooks for enforcing quality checks.
- `Commitlint` validation for Conventional Commits.
- `VSCode` workspace recommendations.

---

## What ESLint is Doing

The project uses `ESLint` to enforce code quality rules and detect potential problems in `TypeScript` and `React` code.

The configured rules primarily focus on:

- Maintaining consistent import ordering.
- Detecting unsafe or problematic coding patterns.
- Enforcing Web Core Vitals performance recommendations.
- Supporting TypeScript-aware linting.

### Import Ordering

Imports are automatically organized according to these groups:

1. Built-in Node modules
2. External dependencies
3. Internal project modules
4. Sibling modules
5. Parent directory modules
6. Index files

Additionally:

- Imports inside the same group are sorted alphabetically (case-insensitive).
- Blank lines are enforced between different import groups.

---

## What Prettier is Doing

Prettier is responsible for automatic code formatting.

It ensures:

- Consistent indentation.
- Consistent spacing.
- Standardized quote usage.
- Clean and readable code structure.

Prettier formatting is automatically applied when saving files (if the editor is configured accordingly).

Prettier works alongside ESLint, and conflicts between formatting rules are disabled to avoid overlapping behavior.

---

## Git Hooks Enforcement

### Pre-commit Hook

Before allowing a commit, the repository automatically runs:

- ESLint auto-fix on staged files.
- Prettier formatting on staged files.

If unresolved linting or formatting errors remain, the commit will be blocked.

---

### Commit Message Validation

Commit messages must follow the Conventional Commits standard.

Allowed commit types include:

- `feat` – New feature implementation.
- `fix` – Bug fixes.
- `chore` – Maintenance and tooling updates.
- `docs` – Documentation changes.
- `refactor` – Code restructuring without behavior change.
- `test` – Test-related changes.
- `build` – Build system modifications.
- `ci` – Continuous integration changes.
- `perf` – Performance improvements.
- `revert` – Reverting previous commits.

Example of a valid commit message:

`feat: add movie gallery search feature`

Invalid commit messages will be rejected automatically.

---

## Editor Integration

The workspace configuration includes recommendations for:

- ESLint extension for code analysis and auto-fixing.
- Prettier extension for formatting.

Recommended settings:

- Format on save enabled.
- ESLint code actions enabled.

---

## Development Environment Requirements

- `Node.js` version 22 or higher is recommended.
- Using a Node Version Manager (such as `nvm`) is strongly suggested when working across multiple projects.

---

## Summary

This setup ensures:

- Consistent code formatting.
- Automatic linting and error detection.
- Structured commit history.
- Reduced repository noise.
- Improved team collaboration and maintainability.

---

---

## Setup Instructions

### Clone the repository

Start by cloning the project and navigating into the project directory.

```bash
git clone <repository-url>
cd movie-gallery
```

---

### Install dependencies

Install all project dependencies before starting development.

```bash
npm install
```

---

### Node environment

This project recommends using Node.js version 22 or higher.

If you use **nvm**, run:

```bash
nvm install 22
nvm use 22
```

---

### Initialize git hooks

If the Husky hooks are not already generated in your local environment, initialize them by running:

```bash
npm run prepare
```

This command registers the git hooks used by the project.

You should see the `.husky/` directory containing:

- pre-commit hook
- commit-msg hook

---

### Verify tooling workflow

To confirm the setup is working correctly:

#### Linting and formatting

Run:

```bash
npm run lint:fix
```

This will:

- Automatically fix linting issues where possible.
- Apply Prettier formatting.

---

#### Commit workflow validation

Test the commit validation system by running:

```bash
git add .
git commit -m "feat: test setup"
```

If the configuration is correct, the commit should be accepted or rejected according to Conventional Commits rules.

---

### Recommended development workflow

During development:

- Use format-on-save if working inside VSCode.
- Let ESLint and Prettier handle code consistency.
- Follow Conventional Commits format for all commits.

---

### Troubleshooting

If git hooks are not executing:

1. Ensure Husky is installed:

```bash
npm run prepare
```

2. Verify hook files exist inside `.husky/`.

3. Make sure hooks are executable:

```bash
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

4. Restart your terminal or IDE if hooks do not trigger.

---
