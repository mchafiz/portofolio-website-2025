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

  // Get unique categories from projects
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

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
            ) : filteredProjects.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <Code2 className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
                <p className="text-muted-foreground">Check back later for new projects</p>
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
