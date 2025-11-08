"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { useParallax } from "@/hooks/use-parallax";
import { GradientText } from "@/components/ui/gradient-text";
import { Code2, Filter, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  demoUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  published: boolean;
}

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const parallax = useParallax(0.2);
  const parallaxFast = useParallax(0.4);
  const parallaxSlow = useParallax(0.3);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects?published=true");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback projects data (matches API structure)
  const fallbackProjects: Project[] = [
    {
      id: "fallback-1",
      title: "i3gis DevSecOps Platform",
      description:
        "Enterprise DevSecOps dashboard consolidating multiple security and development tools into a unified platform. Led full-stack development using React and Next.js for both frontend and backend, delivering production solutions serving enterprise users.",
      tags: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Docker",
        "Microservices",
      ],
      demoUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      category: "DevSecOps",
      featured: true,
      published: true,
    },
    {
      id: "fallback-2",
      title: "Multi-AI Provider Integration",
      description:
        "Built an intelligent chatbot system integrating three major AI providers: Anthropic Claude, OpenAI, and DeepSeek. Developed a dedicated AI service microservice to seamlessly connect multiple LLM providers to the i3gis dashboard with a unified interface.",
      tags: [
        "Next.js",
        "Anthropic",
        "OpenAI",
        "DeepSeek",
        "WebSocket",
        "TypeScript",
      ],
      demoUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      category: "AI Integration",
      featured: false,
      published: true,
    },
    {
      id: "fallback-3",
      title: "Real-time WebSocket Chatbot",
      description:
        "Developed a frontend chatbot interface that consumes WebSocket connections from the backend, enabling real-time AI conversations. Implemented robust message streaming, connection handling, and error recovery for production environments.",
      tags: ["React", "WebSocket", "TypeScript", "Next.js"],
      demoUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=400&fit=crop",
      category: "Full Stack",
      featured: false,
      published: true,
    },
    {
      id: "fallback-4",
      title: "Ticketing System Integration",
      description:
        "Created a microservice integrating Jira and ServiceNow APIs into the i3gis DevSecOps platform. Enables seamless ticket management and workflow automation across enterprise tools, streamlining issue tracking and resolution processes.",
      tags: ["Node.js", "Jira API", "ServiceNow", "REST API", "TypeScript"],
      demoUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
      category: "Integration",
      featured: false,
      published: true,
    },
    {
      id: "fallback-5",
      title: "Version Monitoring System",
      description:
        "Built a monitoring service to track and compare application versions between development and production servers. Automated version checking ensures deployment consistency across i3gis environments, preventing version mismatches.",
      tags: ["Node.js", "TypeScript", "REST API", "Cron Jobs"],
      demoUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      category: "DevSecOps",
      featured: false,
      published: true,
    },
    {
      id: "fallback-6",
      title: "PDF Report Generator Service",
      description:
        "Developed an automated report generation service that converts HTML templates into professional PDF documents for i3gis security scan results. Handles dynamic data rendering, custom formatting, and template management.",
      tags: ["Node.js", "Puppeteer", "HTML/CSS", "TypeScript"],
      demoUrl: "#",
      githubUrl: "#",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
      category: "Backend",
      featured: false,
      published: true,
    },
  ];

  // Get unique categories from projects
  const categories = [
    "All",
    ...Array.from(new Set((projects.length > 0 ? projects : fallbackProjects).map((p) => p.category))),
  ];

  // Use fetched projects or fallback
  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  const filteredProjects =
    filter === "All" ? displayProjects : displayProjects.filter((p) => p.category === filter);

  return (
    <>
      <section id="projects" className="py-20 relative overflow-hidden">
        <div
          className="absolute left-10 top-20 text-[6rem] sm:text-[8rem] md:text-[11rem] font-bold bg-gradient-to-br from-primary/25 to-primary/5 bg-clip-text text-transparent pointer-events-none"
          style={parallax}
        >
          {"{}"}
        </div>

        {/* Tech Logos with Parallax */}
        <div
          className="hidden lg:block absolute right-50 -top-50 pointer-events-none opacity-50"
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
          className="hidden lg:block absolute right-20 -top-50  pointer-events-none opacity-40"
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
          className="hidden lg:block absolute left-40 -top-20 pointer-events-none opacity-40"
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
          className="hidden lg:block absolute left-20 -top-50 pointer-events-none opacity-40"
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <GradientText
                from="from-blue-600"
                via="via-purple-600"
                to="to-pink-600"
                animate={true}
                animationType="slow"
              >
                Featured Projects
              </GradientText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real production projects solving enterprise challenges at scale
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tech={project.tags}
                  liveUrl={project.demoUrl || '#'}
                  githubUrl={project.githubUrl || '#'}
                  featured={project.featured}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))
            )}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <Link href="/projects">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 px-8 group hover:border-primary transition-all duration-300"
              >
                View More Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
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
                <Code2 className="w-4 h-4 text-primary/50" />
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
