"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import { Logo } from "./home-navbar";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const ClosingSection = () => {
  const year = new Date().getFullYear();

  return (
    <>
      {/* CTA banner */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="rounded-xl border border-white/10 bg-card px-6 py-16 text-center">
            <h2
              className={`mx-auto max-w-xl text-balance text-3xl font-semibold tracking-tight md:text-4xl ${font.className}`}
            >
              Ship your next idea tonight
            </h2>
            <p className="mx-auto mt-4 max-w-md text-balance text-muted-foreground">
              Spin up your first Polaris workspace — free, in seconds.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <SignedIn>
                <Button size="lg" className="h-11 px-7" asChild>
                  <Link href="/projects">Open workspace</Link>
                </Button>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button size="lg" className="h-11 px-7">
                    Get started free
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:items-start md:px-6">
          <div className="flex max-w-xs flex-col gap-3">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              The AI-native dev workspace that runs entirely in your browser.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground md:items-end">
            <Link href="#features" className="hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-foreground">
              How it works
            </Link>
            <Link href="/projects" className="hover:text-foreground">
              Workspace
            </Link>
            
            <a
              href="https://github.com/hariswarreddy/polaris"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground"
            >
              <FaGithub className="size-3.5" />
              GitHub
            </a>
          </nav>
        </div>
        <div className="mx-auto mt-8 w-full max-w-6xl border-t border-white/5 px-4 pt-6 md:px-6">
          <p className="text-center text-xs text-muted-foreground">
            © {year} Polaris · Built with Next.js, Convex & Clerk
          </p>
        </div>
      </footer>
    </>
  );
};
