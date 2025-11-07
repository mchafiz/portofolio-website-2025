"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { GradientText } from "@/components/ui/gradient-text";
import { Code2, Filter, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      title: "i3gis DevSecOps Platform",
      description:
        "Enterprise DevSecOps dashboard consolidating multiple security and development tools into a unified platform. Led full-stack development using React and Next.js for both frontend and backend, delivering production solutions serving enterprise users.",
      tech: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Docker",
        "Microservices",
      ],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      category: "DevSecOps",
    },
    {
      title: "Multi-AI Provider Integration",
      description:
        "Built an intelligent chatbot system integrating three major AI providers: Anthropic Claude, OpenAI, and DeepSeek. Developed a dedicated AI service microservice to seamlessly connect multiple LLM providers to the i3gis dashboard with a unified interface.",
      tech: [
        "Next.js",
        "Anthropic",
        "OpenAI",
        "DeepSeek",
        "WebSocket",
        "TypeScript",
      ],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      category: "AI Integration",
    },
    {
      title: "Real-time WebSocket Chatbot",
      description:
        "Developed a frontend chatbot interface that consumes WebSocket connections from the backend, enabling real-time AI conversations. Implemented robust message streaming, connection handling, and error recovery for production environments.",
      tech: ["React", "WebSocket", "TypeScript", "Next.js"],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=400&fit=crop",
      category: "Full Stack",
    },
    {
      title: "Ticketing System Integration",
      description:
        "Created a microservice integrating Jira and ServiceNow APIs into the i3gis DevSecOps platform. Enables seamless ticket management and workflow automation across enterprise tools, streamlining issue tracking and resolution processes.",
      tech: ["Node.js", "Jira API", "ServiceNow", "REST API", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
      category: "Integration",
    },
    {
      title: "Version Monitoring System",
      description:
        "Built a monitoring service to track and compare application versions between development and production servers. Automated version checking ensures deployment consistency across i3gis environments, preventing version mismatches.",
      tech: ["Node.js", "TypeScript", "REST API", "Cron Jobs"],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      category: "DevSecOps",
    },
    {
      title: "PDF Report Generator Service",
      description:
        "Developed an automated report generation service that converts HTML templates into professional PDF documents for i3gis security scan results. Handles dynamic data rendering, custom formatting, and template management.",
      tech: ["Node.js", "Puppeteer", "HTML/CSS", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
      category: "Backend",
    },
    {
      title: "Oli3 Internal ERP System",
      description:
        "Comprehensive internal ERP system for managing company operations including timesheet tracking, KPI monitoring, training management, and leave administration. Built to streamline HR and operational workflows.",
      tech: ["React", "Next.js", "TypeScript", "PostgreSQL", "Node.js"],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
      category: "Full Stack",
    },
    {
      title: "License Management Dashboard",
      description:
        "Product access control and monitoring system for managing software licenses across the organization. Features real-time tracking, usage analytics, and automated renewal notifications.",
      tech: ["React", "Next.js", "TypeScript", "REST API"],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      category: "DevSecOps",
    },
    {
      title: "Ansible Infrastructure Monitoring",
      description:
        "Integrated Ansible with Next.js to provide real-time infrastructure monitoring and management capabilities. Enables automated deployments and configuration management through a web interface.",
      tech: ["Next.js", "Ansible", "Python", "TypeScript", "WebSocket"],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      category: "DevSecOps",
    },
    {
      title: "Issue Data Bank for AI LLM",
      description:
        "Built a comprehensive issue tracking and data collection system using Node.js and Kafka for AI LLM development. Aggregates and processes issue data for machine learning model training.",
      tech: ["Node.js", "Kafka", "PostgreSQL", "TypeScript", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      category: "AI Integration",
    },
    {
      title: "QA Automation Framework",
      description:
        "Implemented comprehensive QA automation using Playwright for security modules including DAST, SAST, and SCA testing. Automated testing pipelines ensure code quality and security compliance.",
      tech: ["Playwright", "TypeScript", "Node.js", "CI/CD"],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
      category: "DevSecOps",
    },
    {
      title: "Fusion Training Mobile App",
      description:
        "Mobile training application with comprehensive UI/UX design. Built using Flutter and Dart with a Laravel admin dashboard for content management and user tracking.",
      tech: ["Flutter", "Dart", "PHP", "Laravel", "REST API"],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
      category: "Mobile",
    },
  ];

  const categories = [
    "All",
    "DevSecOps",
    "AI Integration",
    "Full Stack",
    "Integration",
    "Backend",
    "Mobile",
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Back Button */}
          <Link href="/#projects">
            <Button
              variant="ghost"
              size="sm"
              className="mb-8 gap-2 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Code2 className="w-4 h-4 mr-2" />
              All Projects
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <GradientText
                from="from-blue-600"
                via="via-purple-600"
                to="to-pink-600"
                animate={true}
                animationType="shift"
              >
                My Work Portfolio
              </GradientText>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive collection of production projects, from enterprise
              DevSecOps solutions to AI integrations and full-stack applications
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

          {/* Projects Count */}
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Code2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Interested in working together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <Link href="/#contact">
            <Button size="lg" className="gap-2">
              Get in Touch
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
