"use client";

const CODE_LINES = [
  <>
    <span className="text-violet-400">import</span>{" "}
    <span className="text-zinc-300">{"{ generatePlan }"}</span>{" "}
    <span className="text-violet-400">from</span>{" "}
    <span className="text-emerald-300">&quot;@polaris/agent&quot;</span>
    <span className="text-zinc-500">;</span>
  </>,
  <>{"\u00A0"}</>,
  <>
    <span className="text-violet-400">export async function</span>{" "}
    <span className="text-sky-400">POST</span>
    <span className="text-zinc-500">(</span>
    <span className="text-zinc-300">req</span>
    <span className="text-zinc-500">:</span>{" "}
    <span className="text-sky-400">Request</span>
    <span className="text-zinc-500">)</span>{" "}
    <span className="text-zinc-500">{"{"}</span>
  </>,
  <>
    {"  "}
    <span className="text-violet-400">const</span>{" "}
    <span className="text-zinc-300">{"{ goal }"}</span>{" "}
    <span className="text-sky-400">=</span>{" "}
    <span className="text-violet-400">await</span>{" "}
    <span className="text-zinc-300">req.</span>
    <span className="text-sky-400">json</span>
    <span className="text-zinc-500">();</span>
  </>,
  <>
    {"  "}
    <span className="text-violet-400">const</span>{" "}
    <span className="text-zinc-300">plan</span>{" "}
    <span className="text-sky-400">=</span>{" "}
    <span className="text-violet-400">await</span>{" "}
    <span className="text-zinc-300">generatePlan</span>
    <span className="text-zinc-500">(</span>
    <span className="text-zinc-300">goal</span>
    <span className="text-zinc-500">);</span>
  </>,
  <>
    {"  "}
    <span className="italic text-zinc-600">
      {"// 12 files written \u00b7 installing deps\u2026"}
    </span>
  </>,
];

export const MockWorkspace = () => {
  const files = ["page.tsx", "layout.tsx", "sidebar.tsx", "data.ts"];

  return (
    <div className="relative mx-auto mt-16 w-full max-w-4xl">
      <div
        aria-hidden
        className="absolute -inset-x-10 -top-12 bottom-0 -z-10 rounded-[40px] bg-gradient-to-b from-indigo-500/15 via-transparent to-transparent blur-2xl"
      />
      <div className="overflow-hidden rounded-xl border border-white/10 bg-card shadow-2xl shadow-black/60">
        {/* Title bar */}
        <div className="flex h-10 items-center gap-2 border-b border-white/5 bg-sidebar px-4">
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="ml-3 truncate font-mono text-xs text-muted-foreground">
            saas-dashboard — polaris container
          </span>
        </div>

        {/* Body */}
        <div className="grid grid-cols-[150px_minmax(0,1fr)] divide-x divide-white/5 border-b border-white/5 sm:grid-cols-[170px_minmax(0,1fr)] lg:grid-cols-[170px_minmax(0,1fr)_minmax(0,1fr)] lg:border-b-0">
          {/* File explorer */}
          <div className="flex flex-col gap-0.5 p-2 font-mono text-xs">
            {["app", "components"].map((folder) => (
              <span
                key={folder}
                className="truncate rounded-sm px-2 py-1 text-muted-foreground"
              >
                {folder}/
              </span>
            ))}
            {files.map((file, i) => (
              <span
                key={file}
                className={
                  i === 0
                    ? "ml-3 truncate rounded-sm border-l-2 border-sky-400 bg-accent px-2 py-1 pl-2.5 text-white"
                    : "ml-3 truncate rounded-sm px-2 py-1 pl-2.5 text-muted-foreground"
                }
              >
                {file}
              </span>
            ))}
          </div>

          {/* Code editor */}
          <EditorPane />

          {/* Preview */}
          <PreviewPane />
        </div>


        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-white/5 bg-sidebar px-4 py-2 font-mono text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            dev server ready in 284ms
          </span>
          <span className="hidden sm:block">node 20.x · webcontainer</span>
        </div>
      </div>

      {/* Prompt bar */}
      <div className="mx-auto mt-4 flex max-w-2xl items-center gap-3 rounded-lg border border-white/10 bg-background px-4 py-3 shadow-lg shadow-black/40">
        <span className="flex-1 truncate text-sm text-muted-foreground">
          Ask Polaris to build a SaaS dashboard with charts…
        </span>
        <span className="hidden rounded-md border border-zinc-700 bg-accent px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
          /
        </span>
        <SendButton />
      </div>

      <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
        fig. 01 — your project, running in-tab
      </p>
    </div>
  );
};

const EditorPane = () => (
  <div className="overflow-hidden p-4 font-mono text-[11px] leading-relaxed sm:text-[12.5px]">
    {CODE_LINES.map((line, i) => (
      <div key={i} className="whitespace-pre">
        {line}
      </div>
    ))}
  </div>
);

const PreviewPane = () => (
  <div className="hidden border-l border-white/5 p-2 lg:block">
    <div className="flex h-full flex-col gap-2 rounded-md border border-white/5 bg-background p-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted-foreground">
          localhost:5173
        </span>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
          ready
        </span>
      </div>
      <div className="mt-1 h-7 rounded-sm bg-zinc-800/80" />
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5 rounded-sm bg-zinc-800/60 p-2">
            <div className="h-1.5 w-2/3 rounded-full bg-zinc-700" />
            <div className="h-3 rounded-sm bg-zinc-700/70" />
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-sm bg-zinc-800/60" />
    </div>
  </div>
);

const SendButton = () => (
  <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 text-white"
      aria-hidden
    >
      <path d="m5 12 14 0" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  </span>
);
