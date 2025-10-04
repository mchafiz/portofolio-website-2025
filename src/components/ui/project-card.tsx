import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tech,
  liveUrl,
  githubUrl,
  featured = false,
  className
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-border/50 hover:border-primary/50 glass cursor-none",
        featured && "lg:col-span-2 lg:row-span-2",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden bg-muted",
        featured ? "aspect-video" : "aspect-video"
      )}>
        <Image
          src={image}
          alt={title}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            isHovered && "scale-110"
          )}
        />
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )} />

        {/* Overlay Actions */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center gap-4 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button
            size="sm"
            className="gap-2 bg-background/80 backdrop-blur-sm hover:bg-background"
            asChild
          >
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <Eye className="w-4 h-4" />
              Live Demo
            </a>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-2 bg-background/80 backdrop-blur-sm hover:bg-background"
            asChild
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              Code
            </a>
          </Button>
        </div>

        {/* Featured Badge */}
        {featured && (
          <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <h3 className={cn(
            "font-bold transition-colors group-hover:text-primary",
            featured ? "text-2xl" : "text-xl"
          )}>
            {title}
          </h3>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors" />
            <span className="text-sm text-muted-foreground">42</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className={cn(
          "text-muted-foreground leading-relaxed",
          featured ? "text-base" : "text-sm"
        )}>
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {tech.slice(0, featured ? 6 : 3).map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="text-xs bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              {item}
            </Badge>
          ))}
          {tech.length > (featured ? 6 : 3) && (
            <Badge variant="outline" className="text-xs">
              +{tech.length - (featured ? 6 : 3)} more
            </Badge>
          )}
        </div>

        {/* Footer Actions (Always visible on mobile) */}
        <div className="flex gap-2 pt-2 lg:hidden">
          <Button size="sm" className="gap-2 flex-1" asChild>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View
            </a>
          </Button>
          <Button size="sm" variant="outline" className="gap-2" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}