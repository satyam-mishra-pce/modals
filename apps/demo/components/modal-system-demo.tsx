"use client"

import * as React from "react"
import {
  ArrowRight,
  Check,
  ChevronRight,
  Code,
  Copy,
  Keyboard,
  Layers3,
  LockKeyhole,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  SquareStack,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useModal } from "@/components/ui/modal/context"
import {
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal/modal"

const REPO_URL = "https://github.com/satyam-mishra-pce/modals"

const installCommand =
  "npx shadcn@latest add https://raw.githubusercontent.com/satyam-mishra-pce/modals/main/registry/modals.json"

const providerCode = `import { ModalProvider } from "@/components/ui/modal/context"

export function Providers({ children }: { children: React.ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>
}`

const modalCode = `export function ExampleModal() {
  const modal = useModal()

  return (
    <ModalContent>
      <ModalHeader>
        <ModalTitle>Example modal</ModalTitle>
        <ModalDescription>A short line of context.</ModalDescription>
      </ModalHeader>

      {/* your body */}

      <ModalFooter>
        <button onClick={() => modal.hide().then(modal.clear)}>Close</button>
      </ModalFooter>
    </ModalContent>
  )
}`

const openCode = `const modal = useModal()

modal.pushModal({ id: "example", content: <ExampleModal /> }, true)
modal.show()`

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

function useCopy(text: string) {
  const [copied, setCopied] = React.useState(false)

  const copy = React.useCallback(() => {
    void navigator.clipboard.writeText(text).then(() => setCopied(true))
  }, [text])

  React.useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(id)
  }, [copied])

  return { copied, copy }
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const { copied, copy } = useCopy(text)

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={copy}
      aria-label={label ?? "Copy to clipboard"}
      className="h-7 gap-1.5 text-white/55 hover:bg-white/10 hover:text-white"
    >
      {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : label ?? "Copy"}
    </Button>
  )
}

function CodePanel({ title, code }: { title: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0c09] shadow-xl shadow-black/30">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-white/40">{title}</span>
        </div>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[0.78rem] leading-relaxed text-[#f1ecd8]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function DemoCard({
  icon: Icon,
  index,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  index: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="mb-8 flex items-start justify-between">
        <div className="grid size-11 place-items-center rounded-2xl bg-[#f5efd9] text-[#100f0c] shadow-lg shadow-black/30 transition-transform duration-300 group-hover:-rotate-6">
          <Icon className="size-5" />
        </div>
        <span className="font-mono text-xs text-white/30">{index}</span>
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 mb-6 flex-1 text-sm leading-6 text-white/55">{description}</p>
      <div>{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Modal bodies                                                        */
/* ------------------------------------------------------------------ */

function useModalClose() {
  const modal = useModal()

  return async () => {
    await modal.hide()
    modal.clear()
  }
}

function ModalBanner({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="grid h-24 place-items-center">
      <Icon className="size-12 text-foreground/75" />
    </div>
  )
}

function ModalRow({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-muted/40 p-4">
      <Icon className="size-5 shrink-0 text-foreground/75" />
      <div className="text-sm">
        <div className="font-medium">{title}</div>
        <div className="mt-0.5 text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}

function BasicModal() {
  const close = useModalClose()

  return (
    <ModalContent>
      <ModalHeader>
        <ModalTitle>One body, two surfaces</ModalTitle>
        <ModalDescription>Dialog on desktop, drawer on mobile.</ModalDescription>
      </ModalHeader>

      <div className="space-y-3">
        <ModalBanner icon={MonitorSmartphone} />
        <ModalRow icon={MonitorSmartphone} title="≥ 32rem · Dialog">
          Centered Radix dialog with a close button and focus trap.
        </ModalRow>
        <ModalRow icon={Smartphone} title="< 32rem · Drawer">
          Bottom Vaul drawer with a drag handle and swipe to dismiss.
        </ModalRow>
        <p className="px-1 text-sm leading-6 text-muted-foreground">
          Resize the window with this open to watch it swap surface live — the body stays mounted.
        </p>
      </div>

      <ModalFooter>
        <Button onClick={close}>Got it</Button>
      </ModalFooter>
    </ModalContent>
  )
}

function StackStepOne() {
  const modal = useModal()
  const close = useModalClose()

  return (
    <ModalContent>
      <ModalHeader>
        <ModalTitle>Step 1</ModalTitle>
        <ModalDescription>Push the next step without closing the shell.</ModalDescription>
      </ModalHeader>

      <div className="space-y-3">
        <ModalBanner icon={SquareStack} />
        <div className="grid gap-2 rounded-2xl bg-muted/40 p-3 text-sm">
          <div className="flex items-center gap-3 rounded-xl bg-background p-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-foreground text-xs text-background">1</span>
            Collect a decision.
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-background p-3 opacity-60">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-foreground/15 text-xs">2</span>
            Confirm it.
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-background p-3 opacity-40">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-foreground/15 text-xs">3</span>
            Done.
          </div>
        </div>
        <p className="px-1 text-sm leading-6 text-muted-foreground">
          Each step is its own component. The container stays open while content animates between them.
        </p>
      </div>

      <ModalFooter>
        <Button variant="secondary" onClick={close}>Cancel</Button>
        <Button onClick={() => modal.pushModal({ id: "stack-step-two", content: <StackStepTwo /> })}>
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
      <ModalHeader backAction={() => modal.popModal()}>
        <ModalTitle>Step 2</ModalTitle>
        <ModalDescription>Back pops the stack; closing clears it.</ModalDescription>
      </ModalHeader>

      <div className="space-y-3">
        <ModalBanner icon={Check} />
        <div className="rounded-2xl bg-emerald-500/10 p-4 text-sm text-emerald-100">
          <div className="flex items-center gap-2 font-medium">
            <Check className="size-4" />
            Stack depth: {modal.stack.length}
          </div>
          <div className="mt-2 font-mono text-xs text-emerald-200/80">{modal.stack.join("  →  ")}</div>
        </div>
        <ModalRow icon={SquareStack} title="popModal()">
          Steps back one level and animates to the previous body.
        </ModalRow>
        <ModalRow icon={LockKeyhole} title="clear()">
          Empties the stack — call it after hide() to reset.
        </ModalRow>
      </div>

      <ModalFooter>
        <Button variant="secondary" onClick={() => modal.popModal()}>Back</Button>
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
        <ModalDescription>Escape, outside click, and swipe are disabled.</ModalDescription>
      </ModalHeader>

      <div className="space-y-3">
        <ModalBanner icon={LockKeyhole} />
        <div className="rounded-2xl bg-amber-400/10 p-4 text-sm leading-6">
          With <code className="rounded bg-foreground/10 px-1 py-0.5 text-[0.8em]">dismissible={"{false}"}</code> the modal can only be left through an action you provide.
        </div>
        <ModalRow icon={ShieldCheck} title="Good for">
          Destructive confirmations and required terms.
        </ModalRow>
        <ModalRow icon={Check} title="Always">
          Provide a clear action so users are never trapped.
        </ModalRow>
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
        <ModalTitle>Wider dialog</ModalTitle>
        <ModalDescription>Widen the desktop dialog; mobile stays a drawer.</ModalDescription>
      </ModalHeader>

      <div className="space-y-3">
        <ModalBanner icon={Smartphone} />
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            [MonitorSmartphone, "Dialog", "≥ 32rem"],
            [Smartphone, "Drawer", "< 32rem"],
            [SquareStack, "Stack", "Nested flows"],
          ].map(([Icon, title, copy]) => (
            <div key={title as string} className="rounded-2xl bg-muted/40 p-4 text-sm">
              {React.createElement(Icon as React.ComponentType<{ className?: string }>, { className: "mb-3 size-5 text-foreground/75" })}
              <div className="font-medium">{title as string}</div>
              <div className="mt-1 text-muted-foreground">{copy as string}</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-muted/40 p-4 font-mono text-xs text-muted-foreground">
          pushModal(&#123; id, content, dialogWidth: &quot;max-w-2xl&quot; &#125;)
        </div>
      </div>

      <ModalFooter>
        <Button onClick={close}>Close</Button>
      </ModalFooter>
    </ModalContent>
  )
}

/* ------------------------------------------------------------------ */
/* Reference data                                                      */
/* ------------------------------------------------------------------ */

const apiMethods: Array<{ sig: string; desc: string }> = [
  { sig: "show()", desc: "Reveal the container. Resolves after the open transition." },
  { sig: "hide()", desc: "Hide the container. Await before clear()." },
  { sig: "pushModal(variant, replaceAll?)", desc: "Push a modal. Pass replaceAll to start a fresh flow." },
  { sig: "popModal()", desc: "Remove the top modal and animate back." },
  { sig: "clear()", desc: "Empty the stack." },
  { sig: "stack", desc: "string[] of ids on the stack." },
  { sig: "mode", desc: '"dialog" | "drawer" | null — the resolved surface.' },
]

const anatomy: Array<{ name: string; desc: string }> = [
  { name: "<ModalProvider>", desc: "Wraps your app once and renders the active shell." },
  { name: "<ModalContent dismissible?>", desc: "Body wrapper. dismissible={false} locks it." },
  { name: "<ModalHeader backAction?>", desc: "Header; backAction renders a back button." },
  { name: "<ModalTitle> / <ModalDescription>", desc: "Accessible title and description." },
  { name: "<ModalFooter>", desc: "Dialog footer on desktop, drawer footer on mobile." },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function ModalSystemDemo() {
  const modal = useModal()

  const openModal = (id: string, content: React.ReactNode, dialogWidth?: string) => {
    modal.pushModal(dialogWidth ? { id, content, dialogWidth } : { id, content }, true)
    modal.show()
  }

  return (
    <main className="relative min-h-svh overflow-x-clip bg-[#100f0c] text-[#f5efd9]">
      {/* atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10 [background-image:radial-gradient(120%_80%_at_12%_-10%,rgba(245,158,11,0.16),transparent_55%),radial-gradient(90%_70%_at_100%_0%,rgba(16,185,129,0.10),transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:38px_38px] [mask-image:radial-gradient(90%_55%_at_50%_0%,black,transparent)]" />

      {/* header */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#100f0c]/70 backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-[#f5efd9] text-[#100f0c]">
              <Layers3 className="size-4.5" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">modals</div>
              <div className="text-xs text-white/45">shadcn registry</div>
            </div>
          </div>
          <Button asChild variant="outline" className="h-9 gap-2 rounded-full border-white/15 bg-white/[0.03] text-sm">
            <a href={REPO_URL} target="_blank" rel="noreferrer">
              <Code className="size-4" /> Source
            </a>
          </Button>
        </nav>
      </header>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-32 px-6 py-24 sm:px-8 lg:py-32">
        {/* hero */}
        <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0">
            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              A modal stack you{" "}
              <span className="font-instrument text-4xl text-amber-300 italic sm:text-5xl lg:text-6xl">copy</span>{" "}
              into your app.
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-white/60 sm:text-lg">
              One body. Dialog on desktop, drawer on mobile, stacked flows from a tiny provider.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="h-11 rounded-full bg-[#f5efd9] px-6 text-sm text-[#100f0c] hover:bg-white"
                onClick={() => openModal("basic", <BasicModal />)}
              >
                Try the demo <ArrowRight className="size-4" />
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-full border-white/15 bg-white/[0.03] px-6 text-sm">
                <a href="#setup">Get started</a>
              </Button>
            </div>
          </div>

          <div className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="size-4 text-amber-300" />
                Install
              </span>
              <CopyButton text={installCommand} />
            </div>
            <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0c09] p-4 font-mono text-xs leading-relaxed text-[#f1ecd8]">
              <code>
                <span className="text-emerald-400">$ </span>
                {installCommand}
              </code>
            </pre>
            <div className="mt-3 flex items-start gap-2 px-1 text-xs text-white/45">
              <ChevronRight className="mt-0.5 size-3.5 shrink-0" />
              Drops the provider and modal primitives into your project.
            </div>
          </div>
        </section>

        {/* live demos */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Live demos</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <DemoCard icon={MonitorSmartphone} index="01" title="Responsive shell" description="Dialog on desktop, drawer on mobile.">
              <Button className="w-full" onClick={() => openModal("basic", <BasicModal />)}>Open</Button>
            </DemoCard>
            <DemoCard icon={Layers3} index="02" title="Stacked flow" description="Push and pop nested steps in place.">
              <Button className="w-full" variant="secondary" onClick={() => openModal("stack-step-one", <StackStepOne />)}>Open</Button>
            </DemoCard>
            <DemoCard icon={LockKeyhole} index="03" title="Non-dismissible" description="Force an explicit action to close.">
              <Button className="w-full" variant="outline" onClick={() => openModal("locked", <LockedModal />)}>Open</Button>
            </DemoCard>
            <DemoCard icon={Smartphone} index="04" title="Custom width" description="Widen the desktop dialog only.">
              <Button className="w-full" onClick={() => openModal("wide", <WideModal />, "max-w-2xl")}>Open</Button>
            </DemoCard>
          </div>
        </section>

        {/* setup */}
        <section id="setup" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Set up in three steps</h2>
          <div className="mx-auto mt-12 max-w-3xl space-y-14">
            <Step n="1" title="Wrap your app once">
              Mount <Mono>{"<ModalProvider>"}</Mono> near your root.
            </Step>
            <CodePanel title="app/providers.tsx" code={providerCode} />

            <Step n="2" title="Describe a modal body">
              Compose <Mono>{"<ModalContent>"}</Mono> with a header, body, and footer.
            </Step>
            <CodePanel title="components/example-modal.tsx" code={modalCode} />

            <Step n="3" title="Open it from anywhere">
              Push a body onto the stack, then call <Mono>show()</Mono>.
            </Step>
            <CodePanel title="open-example.ts" code={openCode} />
          </div>
        </section>

        {/* reference */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Reference</h2>
          <div className="mt-10 space-y-8">
            <RefTable
              caption="useModal()"
              head={["Member", "Description"]}
              rows={apiMethods.map((m) => [m.sig, m.desc])}
            />
            <RefTable
              caption="Components"
              head={["Component", "Description"]}
              rows={anatomy.map((a) => [a.name, a.desc])}
            />
          </div>
        </section>

        {/* closing panel */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#19170f] p-8 shadow-2xl shadow-black/40 sm:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div>
              <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                One API for every{" "}
                <span className="font-instrument text-amber-300 italic">modal</span>.
              </p>
              <p className="mt-4 max-w-sm text-sm leading-7 text-[#d8cfac]">
                Own the code, restyle it freely, and skip the boilerplate.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  className="h-11 rounded-full bg-[#f5efd9] px-6 text-sm text-[#19170f] hover:bg-white"
                  onClick={() => openModal("stack-step-one", <StackStepOne />)}
                >
                  See a stacked flow <ArrowRight className="size-4" />
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-full border-white/15 bg-transparent px-6 text-sm text-[#f5efd9] hover:bg-white/10">
                  <a href={REPO_URL} target="_blank" rel="noreferrer">
                    <Code className="size-4" /> Source
                  </a>
                </Button>
              </div>
            </div>

            <ul className="grid gap-3">
              {[
                { icon: MonitorSmartphone, title: "Responsive shell", body: "Switched at 32rem." },
                { icon: SquareStack, title: "Stacked flows", body: "Push and pop with animation." },
                { icon: ShieldCheck, title: "Accessible", body: "Focus trap and ARIA built in." },
                { icon: Keyboard, title: "Tiny API", body: "Five methods, that's it." },
              ].map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-300/15 text-amber-300">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="font-medium text-[#f5efd9]">{title}</div>
                    <div className="text-sm text-[#d8cfac]">{body}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-white/45 sm:flex-row sm:px-8">
          <span>Copy-paste responsive modal stack · MIT</span>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[#f5efd9]"
          >
            <Code className="size-4" /> github.com/satyam-mishra-pce/modals
          </a>
        </div>
      </footer>
    </main>
  )
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.82em] text-amber-200/90">
      {children}
    </code>
  )
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-amber-300/40 font-mono text-sm text-amber-300">
        {n}
      </span>
      <div>
        <h3 className="font-semibold tracking-tight">{title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-white/55">{children}</p>
      </div>
    </div>
  )
}

function RefTable({
  caption,
  head,
  rows,
}: {
  caption: string
  head: [string, string]
  rows: string[][]
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="border-b border-white/10 bg-white/[0.03] px-5 py-3 font-mono text-sm text-amber-200/90">
        {caption}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
              <th className="px-5 py-3 font-medium">{head[0]}</th>
              <th className="px-5 py-3 font-medium">{head[1]}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map(([a, b]) => (
              <tr key={a}>
                <td className="px-5 py-3 align-top font-mono text-xs whitespace-nowrap text-amber-200/90">{a}</td>
                <td className="px-5 py-3 text-white/60">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
