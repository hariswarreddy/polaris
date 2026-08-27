import type { ElementType } from "react";
import {
  ActivityIcon,
  BoxesIcon,
  CommandIcon,
  FileCode2Icon,
  FolderTreeIcon,
  GitBranchIcon,
  PanelsTopLeftIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SquareTerminalIcon,
  ZapIcon,
} from "lucide-react";

import { Kbd } from "@/components/ui/kbd";

type Feature = {
  icon: ElementType;
  title: string;
  description: string;
  tags?: string[];
};

const FEATURES: Feature[] = [
  { icon: SparklesIcon, title: "Prompt-to-product agent", description: "Describe any app in plain language. The agent plans, writes and iterates on real code across your project tree." },
  { icon: BoxesIcon, title: "Sandboxed Node runtime", description: "A full container boots inside the tab — install dependencies and run dev servers with zero local setup.", tags: ["WebContainers"] },
  { icon: FileCode2Icon, title: "Editor built for code", description: "Syntax highlighting, a minimap and indentation guides across languages you actually use.", tags: ["CodeMirror 6"] },
  { icon: SquareTerminalIcon, title: "Integrated terminal", description: "Install packages, run scripts and watch build output stream into a terminal bound to your container.", tags: ["xterm.js"] },
  { icon: PanelsTopLeftIcon, title: "Resizable split preview", description: "Chat, editor, terminal and live preview dock side-by-side with independently resizable panes.", tags: ["Allotment panels"] },
  { icon: FolderTreeIcon, title: "Visual file manager", description: "Create, rename and organise nested folders and files. Binary uploads persist through managed blob storage." },
  { icon: GitBranchIcon, title: "Two-way GitHub sync", description: "Pull a repository into a fresh workspace or push finished work back with a guided export flow.", tags: ["Import", "Export"] },
  { icon: CommandIcon, title: "Command everything", description: "Search projects, spin up workspaces and jump between tools without leaving the keyboard." },
];

const INFRA = [
  { icon: ZapIcon, title: "Real-time persistence", description: "Convex keeps projects, files and messages synced with an always-visible save state." },
  { icon: ShieldCheckIcon, title: "Authentication built-in", description: "Clerk powers passwordless sign-in, sessions and account management out of the box." },
  { icon: ActivityIcon, title: "Observability first", description: "Structured error reporting through Sentry plus privacy-friendly analytics baked in." },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="scroll-mt-20 py-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="flex max-w-2xl flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
            What’s inside
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            One workspace. Every tool.
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Polaris pairs an AI agent with the professional tooling you expect —
            no plugins, no configuration, no context switching.
          </p>
        </div>

        <div className="mt-14 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className="group grid items-start gap-x-8 gap-y-3 px-2 py-7 transition-colors hover:bg-white/[0.02] sm:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)] sm:items-baseline sm:px-4"
            >
              <span className="pt-0.5 font-mono text-xs text-zinc-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="flex items-center gap-2.5 text-sm font-semibold text-white">
                <feature.icon className="size-4 text-zinc-400" aria-hidden />
                {feature.title}
              </h3>
              <div>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                {feature.tags ? (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {feature.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 rounded-lg border border-white/[0.06] bg-sidebar p-4 sm:grid-cols-3 sm:p-5">
          {INFRA.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-white/[0.06] bg-background">
                <item.icon className="size-4 text-zinc-400" />
              </span>
              <div>
                <h4 className="text-sm font-medium text-white">{item.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Jump straight into any project with</span>
          <Kbd className="bg-accent">⌘K</Kbd>
          <span>· create with</span>
          <Kbd className="bg-accent">⌘N</Kbd>
          <span>· import with</span>
          <Kbd className="bg-accent">⌘I</Kbd>
        </div>
      </div>
    </section>
  );
};
