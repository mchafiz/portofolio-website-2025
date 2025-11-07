import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Eye, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  views: number;
  likes: number;
  tags: string[];
  slug: string;
  featured?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ArticleCard({
  title,
  description,
  image,
  date,
  category,
  views,
  likes,
  tags,
  slug,
  featured = false,
  className,
  style,
}: ArticleCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <Link href={`/articles/${slug}`}>
      <Card
        className={cn(
          "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-border/50 hover:border-primary/50 glass cursor-pointer h-full flex flex-col",
          featured && "lg:col-span-2",
          className
        )}
        style={style}
      >
        {/* Image Container */}
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            featured ? "aspect-[16/9]" : "aspect-video"
          )}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary transition-colors">
            {category}
          </Badge>

          {/* Featured Badge */}
          {featured && (
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Featured
            </Badge>
          )}
        </div>

        <CardHeader className="pb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {date}
              </span>
            </div>
          </div>

          <h3
            className={cn(
              "font-bold line-clamp-2 group-hover:text-primary transition-colors",
              featured ? "text-2xl" : "text-xl"
            )}
          >
            {title}
          </h3>
        </CardHeader>

        <CardContent className="space-y-4 flex-1 flex flex-col">
          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs hover:bg-primary/20 transition-colors cursor-pointer"
              >
                #{tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t mt-auto">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {views.toLocaleString()} views
              </span>
              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-1 hover:text-red-500 transition-colors",
                  isLiked && "text-red-500"
                )}
              >
                <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
                {likeCount}
              </button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="group-hover:bg-primary/10 transition-colors"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
