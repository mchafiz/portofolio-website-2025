import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  to?: string;
  via?: string;
  animate?: boolean;
  animationType?: "wave" | "shift" | "rotate" | "slow" | "fast";
}

export function GradientText({
  children,
  className,
  from = "from-blue-600",
  to = "to-purple-600",
  via = "via-pink-500",
  animate = false,
  animationType = "wave",
}: GradientTextProps) {
  const animationClass = animate ? `animate-gradient-${animationType}` : "";

  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        from,
        via,
        to,
        animationClass,
        className
      )}
    >
      {children}
    </span>
  );
}