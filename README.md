## Development Setup

### Requirements

- Node.js >= 22
- npm

It is recommended to use **nvm** to manage Node versions.

If using nvm:

```bash
nvm install 22
nvm use 22
```

---

### Install dependencies

```bash
npm install
```

---

### Editor configuration

This project uses ESLint + Prettier auto-fixing.

Recommended extensions:

- ESLint (Microsoft)
- Prettier - Code formatter

Workspace settings are provided in `.vscode/`.

Ensure the following is enabled in your editor:

- Format on save
- ESLint code actions on save

---

### Git hooks

The repository enforces code quality and commit standards using Husky.

#### Pre-commit hook

Runs formatting and linting on staged files:

- ESLint auto-fix
- Prettier formatting

#### Commit message validation

Commit messages must follow **Conventional Commits** format.

Example of a valid commit message:

```
feat: add movie card component
```

Allowed commit types:

- feat
- fix
- chore
- docs
- refactor
- test
- build
- ci
- perf
- revert

Invalid commit messages will be rejected automatically.

---

### Commit workflow

```bash
git add .
git commit -m "feat: description"
```

If formatting or linting issues are detected, the commit will fail.

---

### Environment recommendation

- Use Node Version Manager (nvm) when working across multiple projects.
- Keep Node version aligned with project requirements.
