"use client";

import { Loader } from "lucide-react";

interface LoadingIndicatorProps {
  text?: string;
  className?: string;
  iconClassName?: string;
}

export function LoadingIndicator({
  text = "Loading...",
  className = "h-64",
  iconClassName = "h-8 w-8"
}: LoadingIndicatorProps) {
  return (
    <div className={`flex justify-center items-center rounded-md border ${className}`}>
      <Loader className={`animate-spin text-primary ${iconClassName}`} />
      {text && <span className="ml-2 text-muted-foreground">{text}</span>}
    </div>
  );
}