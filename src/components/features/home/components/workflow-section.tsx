import { HammerIcon, PenLineIcon, RocketIcon } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: PenLineIcon,
    title: "Describe it",
    description:
      "Type the product you imagine — a landing page, an API, a game. Attach constraints and let the agent draft the plan.",
  },
  {
    number: "02",
    icon: HammerIcon,
    title: "Watch it build",
    description:
      "Polaris writes code across your tree, installs dependencies in the terminal and boots a dev server in a browser container.",
  },
  {
    number: "03",
    icon: RocketIcon,
    title: "Preview & ship",
    description:
      "Refine with follow-up prompts against live preview panes, then export the finished project to your GitHub repository.",
  },
];

export const WorkflowSection = () => {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-y border-white/5 bg-sidebar py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="flex max-w-2xl flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
            How it works
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            From prompt to production
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Three steps, zero configuration. Polaris handles the environment so
            you can stay focused on ideas.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="relative flex flex-col rounded-lg border border-white/[0.06] bg-card p-6 transition-colors hover:border-white/15"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs text-zinc-400">
                  {step.number}
                </span>
                <step.icon className="size-5 text-zinc-500" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
