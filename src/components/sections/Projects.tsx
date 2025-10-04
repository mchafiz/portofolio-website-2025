"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { useParallax } from "@/hooks/use-parallax";
import { GradientText } from "@/components/ui/gradient-text";
import { Code2, Filter, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const parallax = useParallax(0.2);
  const parallaxFast = useParallax(0.4);
  const parallaxSlow = useParallax(0.3);

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform with secure payment integration, real-time inventory management, and advanced analytics dashboard. Features include user authentication, shopping cart, order tracking, and admin panel.",
      tech: [
        "Next.js",
        "TypeScript",
        "Stripe",
        "Prisma",
        "PostgreSQL",
        "Tailwind CSS",
      ],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      featured: true,
      category: "Full Stack",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, team workspaces, and comprehensive project tracking.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
      category: "Full Stack",
    },
    {
      title: "Weather Dashboard",
      description:
        "A beautiful weather dashboard with location-based forecasts, interactive charts, and severe weather alerts.",
      tech: ["Vue.js", "TypeScript", "Chart.js", "OpenWeather API"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      image:
        "https://images.unsplash.com/photo-1504608524845-2936d5c2727d?w=800&h=400&fit=crop",
      category: "Frontend",
    },
    {
      title: "AI Content Generator",
      description:
        "An AI-powered content generation tool using GPT-3 to create blog posts, social media content, and marketing copy.",
      tech: ["Next.js", "OpenAI API", "Prisma", "PostgreSQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      category: "Full Stack",
    },
    {
      title: "Real-time Chat App",
      description:
        "A feature-rich chat application with end-to-end encryption, file sharing, and video calling capabilities.",
      tech: ["React", "WebRTC", "Socket.io", "Node.js", "Redis"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      image:
        "https://images.unsplash.com/photo-1611746869696-e3b9786931f2?w=800&h=400&fit=crop",
      category: "Full Stack",
    },
    {
      title: "Portfolio Template",
      description:
        "A modern, responsive portfolio template with animations, dark mode, and optimized performance.",
      tech: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop",
      category: "Frontend",
    },
  ];

  const categories = ["All", "Full Stack", "Frontend", "Backend", "Mobile"];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div
        className="absolute left-10 top-20 text-[11rem] font-bold bg-gradient-to-br from-primary/25 to-primary/5 bg-clip-text text-transparent pointer-events-none"
        style={parallax}
      >
        {"{}"}
      </div>

      {/* Tech Logos with Parallax */}
      <div
        className="absolute right-50 -top-50 pointer-events-none opacity-50"
        style={parallaxFast}
      >
        <Image
          src="/html.png"
          alt="HTML"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      <div
        className="absolute right-20 -top-50  pointer-events-none opacity-40"
        style={parallax}
      >
        <Image
          src="/css.png"
          alt="CSS"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      <div
        className="absolute left-40 -top-20 pointer-events-none opacity-40"
        style={parallaxSlow}
      >
        <Image
          src="/docker.png"
          alt="Docker"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      <div
        className="absolute left-20 -top-50 pointer-events-none opacity-40"
        style={parallaxSlow}
      >
        <Image
          src="/js.png"
          alt="JavaScript"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Code2 className="w-4 h-4 mr-2" />
            Portfolio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GradientText
              from="from-blue-600"
              via="via-purple-600"
              to="to-pink-600"
            >
              Featured Projects
            </GradientText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore my recent work and creative solutions to real-world problems
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="gap-2 px-8 group hover:border-primary transition-all duration-300"
          >
            View More Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
