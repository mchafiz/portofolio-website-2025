"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ children, content, className, side = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-4 py-3 text-sm text-white bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur-sm shadow-2xl rounded-lg border border-white/10 w-[400px] animate-in fade-in-0 zoom-in-95 duration-200",
            "before:content-[''] before:absolute before:bg-gray-900/95 dark:before:bg-gray-950/95 before:backdrop-blur-sm",
            side === "top" && [
              "bottom-full left-1/2 -translate-x-1/2 mb-3",
              "before:w-2 before:h-2 before:rotate-45 before:bottom-[-4px] before:left-1/2 before:-translate-x-1/2 before:border-b before:border-r before:border-white/10"
            ],
            side === "bottom" && [
              "top-full left-1/2 -translate-x-1/2 mt-3",
              "before:w-2 before:h-2 before:rotate-45 before:top-[-4px] before:left-1/2 before:-translate-x-1/2 before:border-t before:border-l before:border-white/10"
            ],
            side === "left" && [
              "right-full top-1/2 -translate-y-1/2 mr-3",
              "before:w-2 before:h-2 before:rotate-45 before:right-[-4px] before:top-1/2 before:-translate-y-1/2 before:border-r before:border-t before:border-white/10"
            ],
            side === "right" && [
              "left-full top-1/2 -translate-y-1/2 ml-3",
              "before:w-2 before:h-2 before:rotate-45 before:left-[-4px] before:top-1/2 before:-translate-y-1/2 before:border-l before:border-b before:border-white/10"
            ]
          )}
          style={{
            animation: "tooltip-fade-in 0.2s ease-out forwards"
          }}
        >
          <div className="relative z-10 leading-relaxed">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}