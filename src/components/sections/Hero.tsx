"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Download, ArrowRight, Code2, Terminal } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { GradientText } from "@/components/ui/gradient-text";
import Image from "next/image";

const Hero = () => {
  const parallax = useParallax(0.5);
  const parallaxSlow = useParallax(0.3);

  const roles = [
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Tech Explorer"
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div
        className="absolute inset-0 -z-10 opacity-20 dark:opacity-30 pointer-events-none"
        style={parallax}
      >
        <div className="absolute top-20 left-20 text-[12rem] font-bold bg-gradient-to-br from-blue-500/5 to-purple-500/2 bg-clip-text text-transparent animate-float">&lt;/&gt;</div>
        <div className="absolute bottom-20 right-20 text-[12rem] font-bold bg-gradient-to-tl from-purple-500/5 to-pink-500/2 bg-clip-text text-transparent animate-float" style={{animationDelay: '2s'}}>{}</div>
        <div className="absolute top-1/2 left-1/3 text-[10rem] font-bold bg-gradient-to-r from-blue-500/5 to-purple-500/2 bg-clip-text text-transparent animate-float" style={{animationDelay: '4s'}}>[]</div>
      </div>

      {/* Floating Terminal Window */}
      <div
        className="absolute top-20 right-20 glass rounded-lg p-4 max-w-xs animate-float shadow-xl"
        style={{animationDelay: '1s'}}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="font-mono text-sm">
          <p className="text-green-600">$ npm install success</p>
          <p className="text-blue-600">✓ Dependencies installed</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          {/* Greeting Badge */}
          <Badge
            variant="outline"
            className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5 text-primary animate-slide-up"
          >
            <Terminal className="w-4 h-4 mr-2" />
            <span>Hi, I'm</span>
          </Badge>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <GradientText from="from-blue-600" via="via-purple-600" to="to-pink-600">
              Muhammad
            </GradientText>
            <br />
            <span className="text-foreground">Chaerul Hafiz</span>
          </h1>

          {/* Animated Role */}
          <div className="h-10 mb-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <TypingAnimation
              texts={roles}
              className="text-2xl md:text-3xl text-muted-foreground font-medium"
            />
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.3s'}}>
            Passionate about crafting elegant solutions to complex problems.
            I specialize in building scalable web applications with modern technologies
            and creating delightful user experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <Button
              size="lg"
              className="gap-2 px-8 py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 glow"
            >
              <Download className="w-5 h-5" />
              Download CV
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-8 py-3 text-base font-medium border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center animate-slide-up" style={{animationDelay: '0.5s'}}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full border border-border hover:border-primary bg-background/50 hover:bg-primary/10 transition-all duration-300"
            >
              <Github className="w-6 h-6 group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full border border-border hover:border-primary bg-background/50 hover:bg-primary/10 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6 group-hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="group p-3 rounded-full border border-border hover:border-primary bg-background/50 hover:bg-primary/10 transition-all duration-300"
            >
              <Mail className="w-6 h-6 group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Tech Stack Preview */}
          <div className="mt-16 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <p className="text-sm text-muted-foreground mb-4">Technologies I work with:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Docker', 'AWS'].map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-3 py-1 bg-muted/50 hover:bg-muted transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
