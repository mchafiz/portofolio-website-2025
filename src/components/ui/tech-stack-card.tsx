import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface TechStackCardProps {
  name: string;
  icon: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  className?: string;
}

const levelColors = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  Expert: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
};

export function TechStackCard({ name, icon, category, level, className }: TechStackCardProps) {
  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-300 hover:scale-105 border border-border/50 hover:border-primary/50 cursor-pointer glass",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg blur-md group-hover:blur-lg transition-all"></div>
            <div className="relative bg-background/50 rounded-lg p-3">
              <Image
                src={icon}
                alt={name}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
          <Badge className={cn("text-xs", levelColors[level])}>
            {level}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}