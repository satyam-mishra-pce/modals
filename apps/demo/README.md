# Modals Demo

Next.js app that documents and demos the modal registry.

This app intentionally installs the modal system through shadcn. From the repository root:

```bash
bunx shadcn@latest add ./registry/modals.json --cwd apps/demo
```

Or from this folder:

```bash
bun run registry:install
```

That makes it a smoke test for registry paths, dependencies, aliases, and the generated component files.

## Run locally

```bash
cd apps/demo
bun install
bun dev
```

## Deploy

Deploy this folder as the Vercel root directory:

```txt
apps/demo
```
