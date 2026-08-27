"use client";

import { useAuth } from "@clerk/nextjs";
import { ClosingSection } from "./closing-section";
import { FeaturesSection } from "./features-section";
import { HeroSection } from "./hero-section";
import { HomeNavbar } from "./home-navbar";
import { WorkflowSection } from "./workflow-section";
import { redirect } from "next/navigation";

export const HomePage = () => {
  const { isSignedIn } = useAuth();
  
  if (!isSignedIn) {
    
    return (
      <div className="min-h-screen bg-background">
        <HomeNavbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <WorkflowSection />
        </main>
        <ClosingSection />
      </div>
    );
  }
  redirect("/projects");
};
