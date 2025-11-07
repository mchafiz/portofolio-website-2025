"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/ui/article-card";
import { GradientText } from "@/components/ui/gradient-text";
import { Code2, Filter, ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ArticlesPage() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
    {
      title: "Building Enterprise DevSecOps Platforms: Lessons Learned",
      description:
        "A comprehensive guide to building scalable DevSecOps platforms, integrating security tools, and automating workflows for enterprise environments.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      date: "Jan 15, 2024",
      readTime: "8 min read",
      category: "DevSecOps",
      author: "Muhammad Chaerul Hafiz",
      views: 1234,
      likes: 42,
      tags: ["DevSecOps", "React", "Next.js", "Enterprise", "Security"],
      slug: "building-enterprise-devsecops-platforms",
    },
    {
      title: "Integrating Multiple AI Providers: A Practical Guide",
      description:
        "Learn how to integrate multiple AI providers like Anthropic, OpenAI, and DeepSeek into a unified system with proper error handling and fallback mechanisms.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      date: "Jan 10, 2024",
      readTime: "6 min read",
      category: "AI Integration",
      author: "Muhammad Chaerul Hafiz",
      views: 987,
      likes: 38,
      tags: ["AI", "Anthropic", "OpenAI", "DeepSeek", "Integration"],
      slug: "integrating-multiple-ai-providers",
      featured: true,
    },
    {
      title: "Real-time WebSocket Communication in Next.js",
      description:
        "Deep dive into implementing WebSocket connections for real-time features in Next.js applications, including message streaming and connection handling.",
      image:
        "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=400&fit=crop",
      date: "Jan 5, 2024",
      readTime: "7 min read",
      category: "Full Stack",
      author: "Muhammad Chaerul Hafiz",
      views: 1456,
      likes: 52,
      tags: ["WebSocket", "Next.js", "Real-time", "TypeScript"],
      slug: "real-time-websocket-communication",
    },
    {
      title: "Automating QA with Playwright: Best Practices",
      description:
        "Comprehensive guide to implementing QA automation using Playwright for security modules, including DAST, SAST, and SCA testing workflows.",
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
      date: "Dec 28, 2023",
      readTime: "9 min read",
      category: "Testing",
      author: "Muhammad Chaerul Hafiz",
      views: 823,
      likes: 31,
      tags: ["Playwright", "Testing", "QA", "Automation", "DevSecOps"],
      slug: "automating-qa-with-playwright",
    },
    {
      title: "Microservices Architecture for Enterprise Applications",
      description:
        "Building scalable microservices with Node.js, covering service design, API gateways, inter-service communication, and deployment strategies.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      date: "Dec 20, 2023",
      readTime: "10 min read",
      category: "Backend",
      author: "Muhammad Chaerul Hafiz",
      views: 1654,
      likes: 67,
      tags: ["Microservices", "Node.js", "Architecture", "Docker"],
      slug: "microservices-architecture-enterprise",
    },
    {
      title: "Integrating Jira & ServiceNow: Complete Guide",
      description:
        "Step-by-step guide to building a microservice that integrates Jira and ServiceNow APIs for seamless ticket management and workflow automation.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
      date: "Dec 15, 2023",
      readTime: "8 min read",
      category: "Integration",
      author: "Muhammad Chaerul Hafiz",
      views: 745,
      likes: 29,
      tags: ["Jira", "ServiceNow", "Integration", "REST API"],
      slug: "integrating-jira-servicenow",
    },
    {
      title: "PDF Generation with Puppeteer in Node.js",
      description:
        "Learn how to build an automated PDF report generation service that converts HTML templates into professional documents with dynamic data.",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
      date: "Dec 10, 2023",
      readTime: "6 min read",
      category: "Backend",
      author: "Muhammad Chaerul Hafiz",
      views: 592,
      likes: 24,
      tags: ["Puppeteer", "PDF", "Node.js", "Automation"],
      slug: "pdf-generation-puppeteer",
    },
    {
      title: "React Performance Optimization Techniques",
      description:
        "Advanced techniques for optimizing React applications including memoization, code splitting, lazy loading, and proper caching strategies.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      date: "Dec 5, 2023",
      readTime: "7 min read",
      category: "Frontend",
      author: "Muhammad Chaerul Hafiz",
      views: 1892,
      likes: 78,
      tags: ["React", "Performance", "Optimization", "JavaScript"],
      slug: "react-performance-optimization",
    },
    {
      title: "TypeScript Best Practices for Enterprise Apps",
      description:
        "Essential TypeScript patterns and best practices for building type-safe, maintainable enterprise applications with better developer experience.",
      image:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=400&fit=crop",
      date: "Nov 28, 2023",
      readTime: "8 min read",
      category: "Frontend",
      author: "Muhammad Chaerul Hafiz",
      views: 1234,
      likes: 56,
      tags: ["TypeScript", "Best Practices", "JavaScript", "Enterprise"],
      slug: "typescript-best-practices",
    },
    {
      title: "Docker & Kubernetes for Node.js Applications",
      description:
        "Complete guide to containerizing Node.js applications with Docker and orchestrating them with Kubernetes for production deployments.",
      image:
        "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop",
      date: "Nov 20, 2023",
      readTime: "11 min read",
      category: "DevSecOps",
      author: "Muhammad Chaerul Hafiz",
      views: 1567,
      likes: 62,
      tags: ["Docker", "Kubernetes", "Node.js", "DevOps"],
      slug: "docker-kubernetes-nodejs",
    },
    {
      title: "Building Secure REST APIs with Node.js",
      description:
        "Security-focused guide to building REST APIs with proper authentication, authorization, input validation, and rate limiting strategies.",
      image:
        "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=400&fit=crop",
      date: "Nov 15, 2023",
      readTime: "9 min read",
      category: "Backend",
      author: "Muhammad Chaerul Hafiz",
      views: 923,
      likes: 41,
      tags: ["Security", "REST API", "Node.js", "Authentication"],
      slug: "building-secure-rest-apis",
    },
    {
      title: "Next.js App Router: Complete Migration Guide",
      description:
        "Comprehensive guide to migrating from Pages Router to App Router in Next.js, covering new patterns, server components, and best practices.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      date: "Nov 10, 2023",
      readTime: "10 min read",
      category: "Full Stack",
      author: "Muhammad Chaerul Hafiz",
      views: 2134,
      likes: 89,
      tags: ["Next.js", "App Router", "React", "Migration"],
      slug: "nextjs-app-router-migration",
    },
  ];

  const categories = [
    "All",
    "DevSecOps",
    "AI Integration",
    "Full Stack",
    "Frontend",
    "Backend",
    "Testing",
    "Integration",
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = filter === "All" || article.category === filter;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Back Button */}
          <Link href="/#articles">
            <Button
              variant="ghost"
              size="sm"
              className="mb-8 gap-2 hover:bg-primary/10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Code2 className="w-4 h-4 mr-2" />
              Technical Articles
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <GradientText
                from="from-blue-600"
                via="via-purple-600"
                to="to-pink-600"
                animate={true}
                animationType="shift"
              >
                All Articles
              </GradientText>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore in-depth technical articles about DevSecOps, AI
              integration, full-stack development, and modern web technologies
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className="gap-2 transition-all duration-300 rounded-full"
              >
                <Filter className="w-4 h-4" />
                {category}
              </Button>
            ))}
          </div>

          {/* Articles Count */}
          <div className="text-center mb-12">
            <p className="text-sm text-muted-foreground">
              Showing {filteredArticles.length} of {articles.length} articles
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <ArticleCard
                  key={article.slug}
                  {...article}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Code2 className="w-20 h-20 mx-auto mb-6 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-3">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setFilter("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-muted/20 to-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold mb-4">
            <GradientText
              from="from-blue-600"
              via="via-purple-600"
              to="to-pink-600"
              animate={true}
              animationType="shift"
            >
              Want to stay updated?
            </GradientText>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Subscribe to get notified about new articles on DevSecOps, AI, and
            modern web development
          </p>
          <div className="flex gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <Button
              size="lg"
              className="gap-2 px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all rounded-full"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
