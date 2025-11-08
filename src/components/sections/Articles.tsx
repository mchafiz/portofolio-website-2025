"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/ui/article-card";
import { useParallax } from "@/hooks/use-parallax";
import { GradientText } from "@/components/ui/gradient-text";
import {
  FileText,
  Filter,
  Search,
  TrendingUp,
  Calendar,
  Eye,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const Articles = () => {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const parallax = useParallax(0.2);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/articles?published=true");
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories from articles
  const categories = [
    "All",
    ...Array.from(new Set(articles.map((a) => a.category))),
  ];

  const filteredArticles =
    filter === "All" ? articles : articles.filter((a) => a.category === filter);

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "recent") return 0;
    if (sortBy === "popular") return b.views - a.views;
    if (sortBy === "trending") return b.likes - a.likes;
    return 0;
  });

  return (
    <>
      <section id="articles" className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div
          className="absolute right-10 top-20 text-[5rem] sm:text-[7rem] md:text-[10rem] font-bold bg-gradient-to-bl from-primary/5 to-primary/1 bg-clip-text text-transparent pointer-events-none animate-float"
          style={parallax}
        >
          {"</>"}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <FileText className="w-4 h-4 mr-2" />
              Articles & Insights
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <GradientText
                from="from-blue-600"
                via="via-purple-600"
                to="to-pink-600"
                animate={true}
                animationType="wave"
              >
                Technical Articles
              </GradientText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Sharing knowledge on AI, machine learning, and modern web
              development
            </p>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-12">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category)}
                  className="gap-2 transition-all duration-300"
                >
                  <Filter className="w-4 h-4" />
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <div className="flex gap-2">
                {[
                  { value: "recent", label: "Recent", icon: Calendar },
                  { value: "popular", label: "Popular", icon: Eye },
                  { value: "trending", label: "Trending", icon: TrendingUp },
                ].map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    variant={sortBy === value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy(value)}
                    className="gap-1"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : sortedArticles.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
                <p className="text-muted-foreground">Check back later for new content</p>
              </div>
            ) : (
              sortedArticles.map((article, index) => (
                <ArticleCard
                  key={article.slug}
                  title={article.title}
                  description={article.description}
                  image={article.image}
                  date={new Date(article.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  readTime="10 min read"
                  category={article.category}
                  author="Muhammad Chaerul Hafiz"
                  views={article.views}
                  likes={article.likes}
                  tags={article.tags}
                  slug={article.slug}
                  featured={article.featured}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))
            )}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link href="/articles">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 px-8 group hover:border-primary transition-all duration-300"
              >
                View All Articles
                <Search className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Newsletter Section */}
          <div className="mt-20 p-4 sm:p-6 md:p-8 glass rounded-2xl">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Subscribe to My Newsletter
              </h3>
              <p className="text-muted-foreground mb-6">
                Get weekly updates on the latest in AI, ML, and web development.
                No spam, unsubscribe anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="px-8">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative py-8 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
            <div className="px-6">
              <div className="w-8 h-8 rounded-full bg-muted/50 border border-border flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary/50" />
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;
