import { cn } from "@/lib/utils";

interface SkillBarProps {
  name: string;
  level: number;
  className?: string;
}

export function SkillBar({ name, level, className }: SkillBarProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}