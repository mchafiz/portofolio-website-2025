"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SkillBar } from "@/components/ui/skill-bar";
import { TechStackCard } from "@/components/ui/tech-stack-card";
import { useParallax } from "@/hooks/use-parallax";
import { GradientText } from "@/components/ui/gradient-text";
import { Code, User, Award, Target, Download } from "lucide-react";
import Image from "next/image";

const About = () => {
  const parallax = useParallax(0.3);

  const skills = [
    { name: "Frontend Development", level: 90 },
    { name: "Backend Development", level: 85 },
    { name: "Database Design", level: 75 },
    { name: "UI/UX Design", level: 70 },
    { name: "DevOps & Cloud", level: 65 },
  ];

  const techStack = [
    { name: "React", icon: "/js.png", category: "Frontend", level: "Expert" },
    { name: "Next.js", icon: "/js.png", category: "Framework", level: "Expert" },
    { name: "TypeScript", icon: "/js.png", category: "Language", level: "Advanced" },
    { name: "Node.js", icon: "/js.png", category: "Backend", level: "Advanced" },
    { name: "Docker", icon: "/docker.png", category: "DevOps", level: "Intermediate" },
    { name: "PostgreSQL", icon: "/js.png", category: "Database", level: "Advanced" },
  ];
  return (
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
            <GradientText from="from-blue-600" via="via-purple-600" to="to-pink-600">
              Passionate Developer
            </GradientText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Crafting digital experiences with modern technologies and clean code
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
                I'm a passionate full-stack developer with over 5 years of experience
                creating innovative web applications. I specialize in transforming complex
                problems into elegant, user-friendly solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My expertise spans across the entire development stack, from crafting
                pixel-perfect UIs to building scalable backend architectures. I'm constantly
                learning and exploring new technologies to stay at the forefront of web development.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {["Problem Solver", "Team Player", "Quick Learner", "Detail Oriented"].map((trait) => (
                  <Badge key={trait} variant="secondary" className="px-3 py-1">
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
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground">Years Exp</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-sm text-muted-foreground">Coffee Cups</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            Technical Skills
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Code className="w-6 h-6 text-primary" />
            Tech Stack
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
              <TechStackCard
                key={tech.name}
                {...tech}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="gap-2 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300">
            <Download className="w-5 h-5" />
            Download My CV
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;