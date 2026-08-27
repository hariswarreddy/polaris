"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { MenuIcon } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Tech stack", href: "#stack" },
];

export const Logo = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("flex items-center gap-2", className)}>
    <Image src="/logo.svg" alt="Polaris logo" width={26} height={26} />
    <span className={cn("text-[17px] font-semibold tracking-tight text-white", font.className)}>
      Polaris
    </span>
  </Link>
);

const NavActions = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <Button variant="ghost" size="icon" asChild>
      <a
        href="https://github.com/hariswarreddy/polaris"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Polaris on GitHub"
      >
        <FaGithub className="size-4" />
      </a>
    </Button>
    <span className="mx-1 hidden h-5 w-px bg-border lg:block" />
    <SignedIn>
      <Button size="sm" asChild>
        <Link href="/projects">Open Projects</Link>
      </Button>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <SignInButton mode="modal">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          Sign in
        </Button>
      </SignInButton>
      <SignInButton mode="modal">
        <Button size="sm">Get started</Button>
      </SignInButton>
    </SignedOut>
  </div>
);

export const HomeNavbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/45">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              asChild
            >
              <Link
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
        <NavActions className="hidden md:flex" />
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-white/5 bg-sidebar p-0">
              <SheetHeader className="border-b border-white/5 p-4 text-left">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate to Polaris sections
                </SheetDescription>
                <Logo />
              </SheetHeader>
              <div className="flex flex-col gap-1 p-3">
                {NAV_LINKS.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-foreground"
                      asChild
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  </SheetClose>
                ))}
              </div>
              <div className="flex flex-col gap-2 border-t border-white/5 p-4 pt-4">
                <SignedIn>
                  <SheetClose asChild>
                    <Button asChild>
                      <Link href="/projects">Open workspace</Link>
                    </Button>
                  </SheetClose>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full">
                      Sign in
                    </Button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <Button className="w-full">Get started</Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
