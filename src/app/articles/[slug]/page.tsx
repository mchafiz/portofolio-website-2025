"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Eye,
  Heart,
  Share2,
  User,
  Tag,
  Bookmark,
  MessageCircle,
} from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { cn } from "@/lib/utils";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // This would normally come from a database or CMS
  const article = {
    slug: slug,
    title: "Building Enterprise DevSecOps Platforms: Lessons Learned",
    description:
      "A comprehensive guide to building scalable DevSecOps platforms, integrating security tools, and automating workflows for enterprise environments.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    date: "Jan 15, 2024",
    readTime: "8 min read",
    category: "DevSecOps",
    author: "Muhammad Chaerul Hafiz",
    views: 1234,
    likes: 42,
    tags: ["DevSecOps", "React", "Next.js", "Enterprise", "Security"],
    content: [
      {
        type: "paragraph",
        content:
          "Building enterprise-grade DevSecOps platforms requires careful consideration of security, scalability, and developer experience. In this article, I'll share insights from developing the i3gis DevSecOps dashboard.",
      },
      {
        type: "heading",
        level: 2,
        content: "The Challenge",
      },
      {
        type: "paragraph",
        content:
          "Enterprise security tools are often siloed, making it difficult for teams to get a unified view of their security posture. Our goal was to consolidate multiple tools into a single, intuitive dashboard.",
      },
      {
        type: "heading",
        level: 2,
        content: "Architecture Decisions",
      },
      {
        type: "heading",
        level: 3,
        content: "Frontend Stack",
      },
      {
        type: "paragraph",
        content: "We chose React and Next.js for the frontend, leveraging:",
      },
      {
        type: "list",
        items: [
          "Server-side rendering for improved performance",
          "API routes for backend integration",
          "TypeScript for type safety",
          "Tailwind CSS for rapid UI development",
        ],
      },
      {
        type: "heading",
        level: 3,
        content: "Microservices Approach",
      },
      {
        type: "paragraph",
        content:
          "The platform is built using a microservices architecture with dedicated services:",
      },
      {
        type: "list",
        items: [
          "AI Service: Integrates multiple LLM providers (Anthropic, OpenAI, DeepSeek)",
          "Ticketing Service: Connects to Jira and ServiceNow",
          "Version Monitoring: Tracks deployment consistency",
          "Report Generator: Automated PDF generation for security scans",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Key Features",
      },
      {
        type: "heading",
        level: 3,
        content: "1. Multi-AI Provider Integration",
      },
      {
        type: "paragraph",
        content:
          "Integrating three major AI providers required building a unified interface that could:",
      },
      {
        type: "list",
        items: [
          "Handle different API formats",
          "Manage rate limiting and quotas",
          "Provide fallback mechanisms",
          "Stream responses in real-time via WebSocket",
        ],
      },
      {
        type: "heading",
        level: 3,
        content: "2. Real-time Communication",
      },
      {
        type: "paragraph",
        content: "WebSocket integration enables:",
      },
      {
        type: "list",
        items: [
          "Live chat with AI assistants",
          "Real-time notifications",
          "Collaborative features",
          "Instant updates without polling",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Lessons Learned",
      },
      {
        type: "paragraph",
        content:
          "Through the development process, we discovered several key insights that significantly improved our platform's performance and maintainability.",
      },
      {
        type: "heading",
        level: 3,
        content: "Performance Optimization",
      },
      {
        type: "list",
        items: [
          "Implement proper caching strategies",
          "Use React.memo for expensive components",
          "Lazy load heavy modules",
          "Optimize bundle size with code splitting",
        ],
      },
      {
        type: "heading",
        level: 3,
        content: "Security Best Practices",
      },
      {
        type: "list",
        items: [
          "Always validate and sanitize user input",
          "Implement proper authentication and authorization",
          "Use environment variables for sensitive data",
          "Regular security audits and penetration testing",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Conclusion",
      },
      {
        type: "paragraph",
        content:
          "Building enterprise DevSecOps platforms is challenging but rewarding. Focus on security, scalability, and developer experience from day one. The investment in proper architecture and automation pays dividends as your platform grows.",
      },
    ],
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const relatedArticles = [
    {
      title: "Integrating Multiple AI Providers",
      slug: "integrating-multiple-ai-providers",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      category: "AI Integration",
      readTime: "5 min read",
    },
    {
      title: "Real-time WebSocket Communication",
      slug: "real-time-websocket-communication",
      image:
        "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&h=300&fit=crop",
      category: "Full Stack",
      readTime: "6 min read",
    },
    {
      title: "Automating QA with Playwright",
      slug: "automating-qa-with-playwright",
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
      category: "Testing",
      readTime: "7 min read",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-8 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Back Button */}
          <Link href="/#articles">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 gap-2 hover:bg-primary/10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Articles
            </Button>
          </Link>

          {/* Article Header */}
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <GradientText
                from="from-blue-600"
                via="via-purple-600"
                to="to-pink-600"
                animate={true}
                animationType="shift"
              >
                {article.title}
              </GradientText>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {article.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {article.author}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Software Engineer
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 ml-auto">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{article.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">
                    {article.views.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all font-medium",
                  isLiked
                    ? "bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-transform",
                    isLiked && "fill-current scale-110"
                  )}
                />
                <span className="text-sm">{likeCount}</span>
              </button>

              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-full px-5 py-2.5 border-border hover:border-primary/50 hover:bg-primary/5"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-full px-5 py-2.5 border-border hover:border-primary/50 hover:bg-primary/5 ml-auto"
              >
                <MessageCircle className="w-5 h-5" />
                <span>12 Comments</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {article.content.map((block, index) => {
              if (block.type === "heading") {
                if (block.level === 2) {
                  return (
                    <h2
                      key={index}
                      className="text-3xl font-bold mt-16 mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent first:mt-0"
                    >
                      {block.content}
                    </h2>
                  );
                } else if (block.level === 3) {
                  return (
                    <h3
                      key={index}
                      className="text-2xl font-bold mt-10 mb-4 text-foreground"
                    >
                      {block.content}
                    </h3>
                  );
                }
              } else if (block.type === "paragraph") {
                return (
                  <p
                    key={index}
                    className="text-lg text-muted-foreground mb-6 leading-relaxed"
                  >
                    {block.content}
                  </p>
                );
              } else if (block.type === "list") {
                return (
                  <ul key={index} className="space-y-3 mb-8 ml-6 list-none">
                    {block.items?.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-lg text-muted-foreground flex items-start gap-3 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mt-2.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </article>

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Article Tags
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm px-4 py-2 bg-muted/50 hover:bg-primary/20 transition-colors cursor-pointer border border-border hover:border-primary/50"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <GradientText
                from="from-blue-600"
                via="via-purple-600"
                to="to-pink-600"
                animate={true}
                animationType="shift"
              >
                Continue Reading
              </GradientText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore more articles on similar topics
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((related, index) => (
              <Link
                key={related.slug}
                href={`/articles/${related.slug}`}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] border border-border/50 hover:border-primary/50 glass cursor-pointer h-full">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-3 bg-primary/90">
                      {related.category}
                    </Badge>
                    <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors leading-tight">
                      {related.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {related.readTime}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
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
              Enjoyed this article?
            </GradientText>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore more technical articles about DevSecOps, AI integration, and
            full-stack development
          </p>
          <Link href="/articles">
            <Button
              size="lg"
              className="gap-2 px-8 py-6 text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              View All Articles
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
