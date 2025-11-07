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
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const Articles = () => {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const parallax = useParallax(0.2);

  const articles = [
    {
      title:
        "Building Production-Ready RAG Systems with LangChain and Vector Databases",
      description:
        "Learn how to implement Retrieval-Augmented Generation (RAG) systems from scratch. This comprehensive guide covers everything from vector embeddings to production deployment strategies.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      date: "Dec 15, 2024",
      readTime: "15 min read",
      category: "AI/ML",
      author: "Muhammad Chaerul Hafiz",
      views: 5420,
      likes: 234,
      tags: ["RAG", "LangChain", "VectorDB", "OpenAI", "Production"],
      slug: "building-rag-systems",
      featured: true,
    },
    {
      title:
        "Neural Network Optimization: Advanced Techniques for Better Performance",
      description:
        "Deep dive into neural network optimization techniques including quantization, pruning, knowledge distillation, and mixed precision training.",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop",
      date: "Dec 10, 2024",
      readTime: "12 min read",
      category: "AI/ML",
      author: "Muhammad Chaerul Hafiz",
      views: 3890,
      likes: 189,
      tags: ["Neural Networks", "Optimization", "Deep Learning", "TensorFlow"],
      slug: "neural-network-optimization",
      featured: true,
    },
    {
      title: "Next.js 15 App Router: Complete Guide to Server Components",
      description:
        "Master the new App Router architecture in Next.js 15. Learn about server components, streaming, and how to build blazing-fast web applications.",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop",
      date: "Dec 5, 2024",
      readTime: "10 min read",
      category: "Web Development",
      author: "Muhammad Chaerul Hafiz",
      views: 6750,
      likes: 312,
      tags: ["Next.js", "React", "Server Components", "TypeScript"],
      slug: "nextjs-15-app-router",
    },
    {
      title: "Fine-Tuning LLMs for Custom Applications: A Practical Guide",
      description:
        "Step-by-step tutorial on fine-tuning large language models for specific domains. Covers data preparation, training techniques, and evaluation metrics.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
      date: "Nov 28, 2024",
      readTime: "18 min read",
      category: "AI/ML",
      author: "Muhammad Chaerul Hafiz",
      views: 4210,
      likes: 267,
      tags: ["LLM", "Fine-tuning", "Hugging Face", "Transformers"],
      slug: "fine-tuning-llms",
    },
    {
      title: "Real-time WebSocket Applications with Next.js and Socket.io",
      description:
        "Build scalable real-time applications using WebSockets. Learn about connection management, scaling strategies, and best practices.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      date: "Nov 20, 2024",
      readTime: "8 min read",
      category: "Web Development",
      author: "Muhammad Chaerul Hafiz",
      views: 3200,
      likes: 156,
      tags: ["WebSocket", "Socket.io", "Next.js", "Real-time"],
      slug: "realtime-websockets",
    },
    {
      title: "Understanding Transformer Architecture: From Theory to Code",
      description:
        "Comprehensive explanation of transformer architecture. Implement attention mechanisms from scratch and understand how they power modern AI models.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
      date: "Nov 15, 2024",
      readTime: "20 min read",
      category: "AI/ML",
      author: "Muhammad Chaerul Hafiz",
      views: 8900,
      likes: 456,
      tags: ["Transformers", "Attention", "NLP", "Deep Learning"],
      slug: "transformer-architecture",
      featured: true,
    },
    {
      title:
        "Deploying ML Models to Production: Docker, Kubernetes, and Beyond",
      description:
        "Complete guide to deploying machine learning models in production. Covers containerization, orchestration, monitoring, and A/B testing.",
      image:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop",
      date: "Nov 10, 2024",
      readTime: "14 min read",
      category: "DevOps",
      author: "Muhammad Chaerul Hafiz",
      views: 5100,
      likes: 298,
      tags: ["MLOps", "Docker", "Kubernetes", "Deployment"],
      slug: "deploying-ml-models",
    },
    {
      title: "TypeScript Best Practices for Large-Scale Applications",
      description:
        "Learn advanced TypeScript patterns and practices for building maintainable, type-safe applications at scale.",
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
      date: "Nov 5, 2024",
      readTime: "11 min read",
      category: "Web Development",
      author: "Muhammad Chaerul Hafiz",
      views: 4300,
      likes: 201,
      tags: ["TypeScript", "Best Practices", "Architecture", "TypeScript"],
      slug: "typescript-best-practices",
    },
    {
      title:
        "Computer Vision with PyTorch: Building Image Classification Models",
      description:
        "Hands-on tutorial for building computer vision applications. Learn about CNNs, transfer learning, and image preprocessing.",
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=400&fit=crop",
      date: "Oct 28, 2024",
      readTime: "16 min read",
      category: "AI/ML",
      author: "Muhammad Chaerul Hafiz",
      views: 6200,
      likes: 334,
      tags: ["Computer Vision", "PyTorch", "CNN", "Image Classification"],
      slug: "computer-vision-pytorch",
    },
  ];

  const categories = [
    "All",
    "AI/ML",
    "Web Development",
    "DevOps",
    "Tutorial",
    "Research",
  ];

  const filteredArticles = articles.filter(
    (article) => filter === "All" || article.category === filter
  );

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
          className="absolute right-10 top-20 text-[10rem] font-bold bg-gradient-to-bl from-primary/5 to-primary/1 bg-clip-text text-transparent pointer-events-none animate-float"
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
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
            <div className="flex flex-wrap gap-3">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {sortedArticles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                {...article}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
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
          <div className="mt-20 p-8 glass rounded-2xl">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">
                Subscribe to My Newsletter
              </h3>
              <p className="text-muted-foreground mb-6">
                Get weekly updates on the latest in AI, ML, and web development.
                No spam, unsubscribe anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
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
