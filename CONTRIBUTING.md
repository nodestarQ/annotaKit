# Contributing to annotaKit

Thanks for your interest in contributing! This guide will help you get set up and making useful changes quickly.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) 9+

## Project Structure

This is a pnpm monorepo:

```
packages/
  core/    # Main library, published as `annotakit` on npm
  mcp/     # Reserved for future MCP server - not active yet
apps/
  docs/    # Documentation site (SvelteKit)
```

**Tech stack:** Svelte 5, SvelteKit, TypeScript, Tailwind CSS 4, Vite.

## Where Help Is Wanted

Not sure where to start? Here are areas where contributions are most useful:

- **Bug fixes** in the core package
- **Documentation improvements** - typos, clarity, missing examples
- **Export formatting** - better structured output for AI agents
- **UI/UX polish** - toolbar behavior, accessibility, visual refinements
- **MCP groundwork** - research and early design for the planned MCP server

For larger features or architectural changes, please open an issue or discussion first. That way nobody sinks time into work that may not align with the project direction.

## Getting Started

1. Fork and clone the repo.

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the dev server (core package):

   ```bash
   pnpm dev
   ```

4. Start the docs site:

   ```bash
   pnpm dev:docs
   ```

### Local Workflow

For most library changes, edit `packages/core` and run `pnpm dev`. For docs changes, edit `apps/docs` and run `pnpm dev:docs`. The two rarely need to run at the same time.

## Common Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run the core package in dev mode |
| `pnpm dev:docs` | Run the docs site locally |
| `pnpm build` | Build the core package |
| `pnpm build:docs` | Build the docs site |
| `pnpm check` | Run type checking (svelte-check) |

## Making Changes

1. Create a new branch from `main`. Use a descriptive prefix:

   ```bash
   git checkout -b feat/add-keyboard-shortcuts
   git checkout -b fix/toolbar-z-index
   git checkout -b docs/clarify-props-table
   ```

2. Make your changes. Keep commits focused and descriptive.

3. Before pushing, verify your changes:

   ```bash
   pnpm check        # required - type checking must pass
   pnpm build        # required - the package must build cleanly
   pnpm build:docs   # only if you touched anything in apps/docs
   ```

4. Push your branch and open a pull request against `main`.

## Pull Request Guidelines

- Keep PRs small and focused. One concern per PR.
- Explain the motivation - what problem does this solve and why this approach?
- Link a related issue if one exists.
- Include screenshots or GIFs for any UI changes. annotaKit is a visual tool, so reviewers need to see the result.

## Code Style

- Write TypeScript. Avoid `any` where possible.
- Follow existing patterns in the codebase.
- Use Svelte 5 runes (`$state`, `$derived`, `$effect`) - not legacy reactive syntax.
- Keep components small and focused.

## Writing Conventions

- Always write "annotaKit" (lowercase a, capital K) in display text. Code and import references use the actual package name `annotakit`.
- Do not use em dashes. Use commas, periods, or hyphens instead.

## Reporting Issues

Open an issue on GitHub with a clear description and steps to reproduce. Include your browser, OS, and annotaKit version.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
