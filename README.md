# Modals

Copy-paste responsive modal stack components extracted from the Bumicerts app.

This is **not** an npm package. Copy the files into your app like shadcn components.

## Install with shadcn

Run this in a shadcn-ready app:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/satyam-mishra-pce/modals/main/registry/modals.json
```

Or add this registry to `components.json`:

```json
{
  "registries": {
    "@modals": "https://raw.githubusercontent.com/satyam-mishra-pce/modals/main/registry/{name}.json"
  }
}
```

Then install with:

```bash
npx shadcn@latest add @modals/modals
```

## Copy files manually

Copy these paths into your project:

```txt
components/ui/modal/*
components/ui/button.tsx
hooks/use-media-query.ts
lib/utils.ts
lib/logger.ts
```

If your app already has `components/ui/button.tsx`, `lib/utils.ts`, or a media-query hook, you can keep yours and adjust imports.

## Install dependencies manually

The shadcn registry installs dependencies for you. If copying manually, install:

```bash
bun add @radix-ui/react-dialog class-variance-authority clsx framer-motion lucide-react radix-ui tailwind-merge vaul
```

## Use

Wrap your app once:

```tsx
import { ModalProvider } from "@/components/ui/modal/context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}
```

Open a modal:

```tsx
"use client";

import { useModal } from "@/components/ui/modal/context";
import {
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal/modal";

function ExampleModal() {
  return (
    <ModalContent>
      <ModalHeader>
        <ModalTitle>Example</ModalTitle>
        <ModalDescription>A responsive dialog/drawer modal.</ModalDescription>
      </ModalHeader>
    </ModalContent>
  );
}

export function OpenModalButton() {
  const modal = useModal();

  return (
    <button
      onClick={() => {
        modal.pushModal({ id: "example", content: <ExampleModal /> }, true);
        modal.show();
      }}
    >
      Open modal
    </button>
  );
}
```

See `docs/MODALS.md` and `examples/global-modal-flow.md` for the original Bumicerts usage guide.

## Demo app

This repository includes a deployable Next.js documentation/demo app in `apps/demo`.
It installs the modal files through the shadcn registry, so it also acts as a registry smoke test.

```bash
cd apps/demo
bun install
bun dev
```

For Vercel, set the project root directory to:

```txt
apps/demo
```
