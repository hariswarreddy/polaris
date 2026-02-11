"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DemoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const handleBlocking = async () => {
    setIsLoading(true);
    const response = await fetch("/api/demo/blocking", { method: "POST" });
    setIsLoading(false);
  };
  const handleBackground = async () => {
    setIsLoading2(true);
    const response = await fetch("/api/demo/background", { method: "POST" });
    setIsLoading2(false);
  };
  return (
    <div className="flex justify-center items-center gap-3">
      <Button disabled={isLoading} onClick={handleBlocking}>
        {isLoading ? "Loading..." : "Blocking"}
      </Button>
      <Button disabled={isLoading2} onClick={handleBackground}>
        {isLoading2 ? "Loading..." : "Background"}
      </Button>
    </div>
  );
};

export default DemoPage;
