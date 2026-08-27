"use client";

import { Poppins } from "next/font/google";
import { GlobeIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { MockWorkspace } from "./mock-workspace";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const TRUST_CHIPS = [
  { icon: ZapIcon, label: "Instant setup" },
  { icon: GlobeIcon, label: "Runs in your browser" },
  { icon: ShieldCheckIcon, label: "Your code, your repos" },
];

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pt-44">
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[-260px] -z-10 h-[560px] w-[900px] max-w-none -translate-x-1/2 rounded-full bg-white/[0.05] blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center md:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Introducing Polaris 
        </span>

        <h1
          className={cn(
            "mt-7 max-w-3xl text-balance text-5xl font-semibold tracking-tight md:text-7xl",
            font.className,
          )}
        >
          Build full-stack apps at the speed of thought
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
          Polaris is an AI coding agent that plans, writes and ships software
          with you — entirely in your browser. Describe what you want, watch a
          real Node environment bring it to life, then export it to GitHub when
          it’s ready.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <SignedIn>
            <Button size="lg" className="h-11 px-7 text-base" asChild>
              <Link href="/projects">
                Open workspace
                <ArrowGlyph />
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" className="h-11 px-7 text-base">
                Start building
                <ArrowGlyph />
              </Button>
            </SignInButton>
          </SignedOut>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {TRUST_CHIPS.map((chip) => (
            <span key={chip.label} className="inline-flex items-center gap-1.5">
              <chip.icon className="size-3.5 text-zinc-500" />
              {chip.label}
            </span>
          ))}
        </div>

        <MockWorkspace />
      </div>
    </section>
  );
};

const ArrowGlyph = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
    aria-hidden
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
