"use client"

import { ArrowRight, Check, Copy, Layers3, LockKeyhole, MonitorSmartphone, PackageCheck, Smartphone, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useModal } from "@/components/ui/modal/context"
import {
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal/modal"

const installCommand =
  "npx shadcn@latest add https://raw.githubusercontent.com/satyam-mishra-pce/modals/main/registry/modals.json"

const providerCode = `import { ModalProvider } from "@/components/ui/modal/context"

export function Providers({ children }: { children: React.ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>
}`

const modalCode = `"use client"

import { useModal } from "@/components/ui/modal/context"
import {
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal/modal"

export function ExampleModal() {
  const modal = useModal()

  return (
    <ModalContent>
      <ModalHeader>
        <ModalTitle>Example modal</ModalTitle>
        <ModalDescription>
          Accessible title and description are read by dialog/drawer wrappers.
        </ModalDescription>
      </ModalHeader>
      <button onClick={async () => {
        await modal.hide()
        modal.clear()
      }}>
        Close
      </button>
    </ModalContent>
  )
}`

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-3xl border border-foreground/10 bg-[#161511] p-5 text-xs leading-relaxed text-[#f6f0db] shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-black/50">
      <code>{children}</code>
    </pre>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-foreground/10 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
      {children}
    </span>
  )
}

function DemoCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-card/85 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 dark:bg-card/70">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="grid size-11 place-items-center rounded-2xl bg-foreground text-background shadow-lg shadow-black/10">
          <Icon className="size-5" />
        </div>
        <Pill>live demo</Pill>
      </div>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function useModalClose() {
  const modal = useModal()

  return async () => {
    await modal.hide()
    modal.clear()
  }
}

function BasicModal() {
  const close = useModalClose()

  return (
    <ModalContent>
      <ModalHeader>
        <ModalTitle>One component, two surfaces</ModalTitle>
        <ModalDescription>
          Resize below 32rem to see this render through Vaul as a drawer. Desktop renders through Radix Dialog.
        </ModalDescription>
      </ModalHeader>
      <div className="rounded-3xl border border-foreground/10 bg-muted/60 p-4 text-sm leading-6">
        <div className="mb-3 flex items-center gap-2 font-medium">
          <MonitorSmartphone className="size-4" />
          Responsive by default
        </div>
        The modal body stays the same. The provider swaps the shell, overlay, focus behavior, and dismiss handling.
      </div>
      <ModalFooter>
        <Button onClick={close}>Close</Button>
      </ModalFooter>
    </ModalContent>
  )
}

function StackStepOne() {
  const modal = useModal()

  return (
    <ModalContent>
      <ModalHeader>
        <ModalTitle>Stack flow · Step 1</ModalTitle>
        <ModalDescription>
          Push another modal without calling show again. The container remains open and content animates.
        </ModalDescription>
      </ModalHeader>
      <div className="grid gap-3 rounded-3xl bg-muted/50 p-4 text-sm">
        <div className="flex items-center gap-3 rounded-2xl bg-background p-3">
          <span className="grid size-7 place-items-center rounded-full bg-foreground text-xs text-background">1</span>
          Collect a value or decision.
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-background p-3 opacity-60">
          <span className="grid size-7 place-items-center rounded-full border text-xs">2</span>
          Confirm the next step.
        </div>
      </div>
      <ModalFooter>
        <Button
          onClick={() => {
            modal.pushModal({ id: "stack-step-two", content: <StackStepTwo /> })
          }}
        >
          Continue <ArrowRight className="size-4" />
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

function StackStepTwo() {
  const modal = useModal()
  const close = useModalClose()

  return (
    <ModalContent>
      <ModalHeader
        backAction={() => {
          modal.popModal()
        }}
      >
        <ModalTitle>Stack flow · Step 2</ModalTitle>
        <ModalDescription>
          The back button pops the stack. Closing the final modal hides the container and clears state.
        </ModalDescription>
      </ModalHeader>
      <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-950 dark:text-emerald-100">
        <div className="mb-2 flex items-center gap-2 font-medium">
          <Check className="size-4" />
          Stack length: {modal.stack.length}
        </div>
        This is the same provider state that app flows can use for nested confirmation, auth, checkout, or onboarding flows.
      </div>
      <ModalFooter>
        <Button variant="secondary" onClick={() => modal.popModal()}>
          Back
        </Button>
        <Button onClick={close}>Finish</Button>
      </ModalFooter>
    </ModalContent>
  )
}

function LockedModal() {
  const close = useModalClose()

  return (
    <ModalContent dismissible={false}>
      <ModalHeader>
        <ModalTitle>Explicit close only</ModalTitle>
        <ModalDescription>
          Set dismissible=false when the user must choose an action before leaving a flow.
        </ModalDescription>
      </ModalHeader>
      <div className="rounded-3xl border border-amber-500/20 bg-amber-400/10 p-4 text-sm leading-6">
        Escape and outside interaction are ignored. The dialog close button is also hidden.
      </div>
      <ModalFooter>
        <Button onClick={close}>I understand</Button>
      </ModalFooter>
    </ModalContent>
  )
}

function WideModal() {
  const close = useModalClose()

  return (
    <ModalContent>
      <ModalHeader>
        <ModalTitle>Wider dialog content</ModalTitle>
        <ModalDescription>
          Pass dialogWidth when pushing a modal to change the desktop max width while preserving drawer behavior on mobile.
        </ModalDescription>
      </ModalHeader>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Dialog", "Radix shell above 32rem"],
          ["Drawer", "Vaul shell below 32rem"],
          ["Stack", "Animated nested flows"],
        ].map(([title, copy]) => (
          <div key={title} className="rounded-3xl border border-foreground/10 bg-muted/50 p-4">
            <div className="font-medium">{title}</div>
            <div className="mt-2 text-sm text-muted-foreground">{copy}</div>
          </div>
        ))}
      </div>
      <ModalFooter>
        <Button onClick={close}>Close wide modal</Button>
      </ModalFooter>
    </ModalContent>
  )
}

export function ModalSystemDemo() {
  const modal = useModal()

  return (
    <main className="min-h-svh overflow-hidden bg-[#f5efd9] text-[#19170f] dark:bg-[#11100d] dark:text-[#f5efd9]">
      <div className="pointer-events-none fixed inset-0 opacity-70 [background-image:radial-gradient(circle_at_20%_10%,rgba(245,158,11,0.28),transparent_28rem),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.18),transparent_25rem),linear-gradient(rgba(25,23,15,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(25,23,15,0.06)_1px,transparent_1px)] [background-size:auto,auto,32px_32px,32px_32px] dark:opacity-40" />
      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <nav className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-foreground text-background shadow-lg shadow-black/10">
              <Layers3 className="size-5" />
            </div>
            <div>
              <div className="font-semibold tracking-tight">modals</div>
              <div className="text-xs text-muted-foreground">shadcn registry demo</div>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Pill>Radix Dialog</Pill>
            <Pill>Vaul Drawer</Pill>
            <Pill>Stacked flows</Pill>
          </div>
        </nav>

        <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-sm shadow-sm backdrop-blur">
              <PackageCheck className="size-4 text-emerald-600" />
              Installed in this app with shadcn add
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              A modal stack you copy into your app.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              This Next.js demo app installs the modal system from the repository registry using the shadcn CLI, then documents the provider, anatomy, and interaction patterns.
            </p>
          </div>
          <div className="rounded-[2rem] border border-foreground/10 bg-background/70 p-4 shadow-2xl shadow-black/10 backdrop-blur">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Copy className="size-4" />
              Install command
            </div>
            <CodeBlock>{installCommand}</CodeBlock>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DemoCard
            icon={MonitorSmartphone}
            title="Responsive shell"
            description="One modal body renders as a dialog on desktop and a drawer on small screens."
          >
            <Button
              className="w-full"
              onClick={() => {
                modal.pushModal({ id: "basic", content: <BasicModal /> }, true)
                modal.show()
              }}
            >
              Open basic modal
            </Button>
          </DemoCard>

          <DemoCard
            icon={Layers3}
            title="Stacked flow"
            description="Push sub-steps onto the active modal stack and pop back without closing the shell."
          >
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => {
                modal.pushModal({ id: "stack-step-one", content: <StackStepOne /> }, true)
                modal.show()
              }}
            >
              Start stack flow
            </Button>
          </DemoCard>

          <DemoCard
            icon={LockKeyhole}
            title="Non-dismissible"
            description="Disable escape, outside click, and the close affordance for required actions."
          >
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                modal.pushModal({ id: "locked", content: <LockedModal /> }, true)
                modal.show()
              }}
            >
              Open locked modal
            </Button>
          </DemoCard>

          <DemoCard
            icon={Smartphone}
            title="Custom width"
            description="Pass dialogWidth for dense desktop content; mobile still uses the drawer layout."
          >
            <Button
              className="w-full"
              onClick={() => {
                modal.pushModal(
                  { id: "wide", content: <WideModal />, dialogWidth: "max-w-2xl" },
                  true,
                )
                modal.show()
              }}
            >
              Open wide modal
            </Button>
          </DemoCard>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-foreground/10 bg-background/70 p-5 backdrop-blur">
            <div className="mb-4 flex items-center gap-2 font-semibold">
              <Sparkles className="size-4" />
              Provider setup
            </div>
            <CodeBlock>{providerCode}</CodeBlock>
          </div>
          <div className="rounded-[2rem] border border-foreground/10 bg-background/70 p-5 backdrop-blur">
            <div className="mb-4 flex items-center gap-2 font-semibold">
              <Sparkles className="size-4" />
              Modal anatomy
            </div>
            <CodeBlock>{modalCode}</CodeBlock>
          </div>
        </section>

        <section className="rounded-[2rem] border border-foreground/10 bg-[#19170f] p-6 text-[#f5efd9] shadow-2xl shadow-black/15 dark:bg-black/60">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-[#c4b98d]">Registry proof</div>
              <p className="mt-3 text-2xl font-semibold tracking-tight">This app is the smoke test.</p>
            </div>
            <div className="text-sm leading-7 text-[#d8cfac] md:col-span-2">
              The modal files in this app were generated by `shadcn add ./registry/modals.json --cwd apps/demo`, not imported from the repository source. If the registry target paths, dependencies, or aliases break, this demo breaks too.
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
