# Modals

Copy-paste responsive modal stack components extracted from the Bumicerts app.

This is **not** an npm package. Copy the files into your app like shadcn components.

## Copy files

Copy these paths into your project:

```txt
components/ui/modal/*
components/ui/button.tsx
hooks/use-media-query.ts
lib/utils.ts
lib/logger.ts
```

If your app already has `components/ui/button.tsx`, `lib/utils.ts`, or a media-query hook, you can keep yours and adjust imports.

## Install dependencies

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
