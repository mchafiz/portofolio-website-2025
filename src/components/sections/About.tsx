"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { TechStackCard } from "@/components/ui/tech-stack-card";
import { useParallax } from "@/hooks/use-parallax";
import { GradientText } from "@/components/ui/gradient-text";
import { Code, User, Award, Sparkles } from "lucide-react";

const About = () => {
  const parallax = useParallax(0.3);

  const techStack: Array<{
    name: string;
    icon: string;
    category: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  }> = [
    // Frontend Technologies
    {
      name: "React",
      icon: "/react.png",
      category: "Frontend",
      level: "Advanced",
    },
    {
      name: "Next.js",
      icon: "/nextjs.png",
      category: "Frontend",
      level: "Intermediate",
    },
    {
      name: "Linux",
      icon: "/linux.png",
      category: "Oprating System",
      level: "Intermediate",
    },
    {
      name: "Javascript",
      icon: "/js.png",
      category: "Frontend",
      level: "Advanced",
    },
    {
      name: "TypeScript",
      icon: "/ts.png",
      category: "Frontend",
      level: "Intermediate",
    },
    {
      name: "Nest",
      icon: "/nestjs.png",
      category: "Backend",
      level: "Advanced",
    },

    // AI Integration
    {
      name: "Anthropic Claude",
      icon: "/anthropic.png",
      category: "AI",
      level: "Advanced",
    },
    {
      name: "OpenAI API",
      icon: "/openai.png",
      category: "AI",
      level: "Advanced",
    },
    {
      name: "DeepSeek API",
      icon: "/deepseek.png",
      category: "AI",
      level: "Advanced",
    },

    // DevOps & Integrations
    {
      name: "Docker",
      icon: "/docker.png",
      category: "DevOps",
      level: "Advanced",
    },
    {
      name: "Jira",
      icon: "/jira.png",
      category: "Integration/Daily Use",
      level: "Advanced",
    },
    {
      name: "Kafka",
      icon: "/kafka.png",
      category: "Backend",
      level: "Advanced",
    },
  ];
  return (
    <>
      <section id="about" className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div
          className="absolute right-10 top-10 text-[10rem] font-bold bg-gradient-to-bl from-primary/10 to-primary/2 bg-clip-text text-transparent pointer-events-none animate-float"
          style={parallax}
        >
          {"</>"}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <User className="w-4 h-4 mr-2" />
              About Me
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <GradientText
                from="from-blue-600"
                via="via-purple-600"
                to="to-pink-600"
                animate={true}
                animationType="rotate"
              >
                Software Engineer
              </GradientText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Bridging the gap between artificial intelligence and software
              engineering
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* About Card */}
            <Card className="glass lg:col-span-2 p-8">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  My Journey
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m a Software Engineer specializing in enterprise
                  DevSecOps solutions. Currently developing the i3gis DevSecOps
                  dashboard, where I handle full-stack development using React
                  and Next.js for both frontend and backend systems.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My work spans multiple domains: integrating AI providers
                  (Anthropic Claude, OpenAI, DeepSeek) for intelligent chatbot
                  features, building real-time WebSocket communication systems,
                  developing microservices for ticketing integrations (Jira,
                  ServiceNow), creating version monitoring systems, and
                  implementing automated PDF report generation. All solutions
                  are production-grade, serving real enterprise users.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {[
                    "Problem Solver",
                    "Full Stack Engineer",
                    "DevSecOps",
                    "AI Integration",
                    "Microservices",
                    "Real-time Systems",
                  ].map((trait) => (
                    <Badge
                      key={trait}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="glass p-8">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground">
                      AI Providers
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">5+</div>
                    <div className="text-sm text-muted-foreground">
                      Microservices
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">1</div>
                    <div className="text-sm text-muted-foreground">
                      DevSecOps Platform
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">∞</div>
                    <div className="text-sm text-muted-foreground">
                      Problems Solved
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tech Stack Grid */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              Technologies & Expertise
            </h3>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Technologies I use daily to build enterprise DevSecOps solutions
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((tech) => (
                <TechStackCard
                  key={tech.name}
                  {...tech}
                  className="animate-slide-up"
                />
              ))}
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
                <Code className="w-4 h-4 text-primary/50" />
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
