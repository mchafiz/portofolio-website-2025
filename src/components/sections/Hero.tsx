"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GithubIcon as GitHub,
  LinkedinIcon,
  Mail,
  Download,
  ArrowRight,
  Lightbulb,
  User,
} from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { GradientText } from "@/components/ui/gradient-text";
import { Tooltip } from "@/components/ui/tooltip";
import { ContactFormModal } from "@/components/contact-form-modal";
import Image from "next/image";

const Hero = () => {
  const parallax = useParallax(0.5);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "DevSecOps Tools Developer",
    "Problem Solver",
  ];

  const handleDownloadCV = async () => {
    try {
      const response = await fetch("/api/cv/download");

      if (!response.ok) {
        throw new Error("Failed to download CV");
      }

      // Get the filename from Content-Disposition header or use a default
      const contentDisposition = response.headers.get("Content-Disposition");
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : "CV.pdf";

      // Create a blob from the response
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading CV:", error);
      alert("Failed to download CV. Please try again later.");
    }
  };

  return (
    <>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div
          className="absolute inset-0 -z-10 opacity-20 dark:opacity-30 pointer-events-none"
          style={parallax}
        >
          <div className="absolute top-20 left-20 text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-bold bg-gradient-to-br from-blue-500/5 to-purple-500/2 bg-clip-text text-transparent animate-float">
            &lt;/&gt;
          </div>
          <div
            className="absolute bottom-20 right-20 text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-bold bg-gradient-to-tl from-purple-500/5 to-pink-500/2 bg-clip-text text-transparent animate-float"
            style={{ animationDelay: "2s" }}
          >
            {}
          </div>
          <div
            className="absolute top-1/2 left-1/3 text-[5rem] sm:text-[7rem] md:text-[8rem] lg:text-[10rem] font-bold bg-gradient-to-r from-blue-500/5 to-purple-500/2 bg-clip-text text-transparent animate-float"
            style={{ animationDelay: "4s" }}
          >
            []
          </div>
        </div>

        {/* Floating Terminal Window */}
        <div
          className="hidden lg:block absolute top-25 right-20 glass rounded-lg p-4 max-w-xs animate-float shadow-xl"
          style={{ animationDelay: "1s" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="font-mono text-sm">
            <p className="text-blue-600">$ npm run build</p>
            <p className="text-green-600">✓ Build completed</p>
            <p className="text-purple-600">✓ Deploying to production</p>
            <p className="text-cyan-600">✓ App live at https://...</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-7 lg:border-r lg:border-border lg:pr-8 relative">
              {/* Decorative Divider */}
              <div className="absolute right-0 top-1/4 bottom-1/4 w-px lg:hidden">
                <div className="h-full bg-gradient-to-b from-transparent via-border to-transparent"></div>
              </div>
              {/* Greeting Badge */}
              <Tooltip
                side="right"
                content="The journey of learning never ends. Every day is an opportunity to grow, discover, and become better than yesterday."
              >
                <Badge
                  variant="outline"
                  className="mb-6 px-3 py-2 text-xs sm:text-sm font-medium border-primary/20 bg-primary/5 text-primary animate-slide-up cursor-help"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  <span>Learning Never Stops</span>
                </Badge>
              </Tooltip>

              {/* Main Title */}
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="text-white">Muhammad</span>
                <br />
                <GradientText
                  from="from-purple-600"
                  via="via-pink-600"
                  to="to-blue-600"
                  animate={true}
                  animationType="shift"
                >
                  Chaerul Hafiz
                </GradientText>
              </h1>

              {/* Animated Role */}
              <div
                className="h-10 mb-6 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <TypingAnimation
                  texts={roles}
                  className="text-2xl md:text-3xl text-muted-foreground font-medium"
                />
              </div>

              {/* Description */}
              <p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                Building enterprise-grade DevSecOps solutions at i3gis. I
                develop full-stack features using React and Next.js, integrate
                AI capabilities from multiple providers (Anthropic, OpenAI,
                DeepSeek), build real-time WebSocket systems, create
                microservices for ticketing and monitoring, and generate
                automated PDF reports—solving complex problems with scalable,
                production-ready code.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <Button
                  size="lg"
                  onClick={handleDownloadCV}
                  className="gap-2 px-8 py-3 text-base font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-[size:200%_200%] animate-gradient hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-white glow cursor-pointer"
                >
                  <Download className="w-5 h-5 text-white" />
                  Download CV
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsContactModalOpen(true)}
                  className="gap-2 cursor-pointer px-8 py-3 text-base font-medium border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  Get in Touch
                </Button>
              </div>
            </div>

            {/* Right Column - Photo & Social Links */}
            <div className="lg:col-span-5 lg:pl-8">
              {/* Profile Photo */}
              <div
                className="hidden lg:block mb-8 animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="relative inline-block bg-transparent">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto lg:mx-0 rounded-2xl overflow-hidden glass p-1">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-muted/50 relative">
                      <Image
                        src="/fish.png" // Replace with your photo path
                        alt="Muhammad Chaerul Hafiz"
                        width={256}
                        height={256}
                        className="w-full h-full object-cover hover:scale-110 bg-transparent transition-transform duration-500"
                        onError={(e) => {
                          // Fallback placeholder if image not found
                          (e.target as HTMLImageElement).style.display = "none";
                          (
                            e.target as HTMLImageElement
                          ).nextElementSibling?.classList.remove("hidden");
                        }}
                      />

                      {/* AI-themed gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Animated border gradient */}
                      <div className="absolute inset-0 opacity-50 hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl animate-pulse" />
                      </div>

                      {/* Tech grid overlay */}
                      <div className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `linear-gradient(rgba(var(--primary), 0.1) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(var(--primary), 0.1) 1px, transparent 1px)`,
                            backgroundSize: "20px 20px",
                          }}
                        />
                      </div>

                      {/* Fallback placeholder */}
                      <div className="hidden w-full h-full">
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                          <div className="text-center">
                            <div className="w-24 h-24 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="w-12 h-12 text-primary/50" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Your Photo
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Floating Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full animate-bounce"></div>
                </div>
              </div>

              {/* Social Links */}
              <div
                className="flex gap-4 justify-center lg:justify-start mb-8 animate-slide-up"
                style={{ animationDelay: "0.5s" }}
              >
                <a
                  href="https://github.com/mchafiz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full border border-border hover:border-primary bg-background/50 hover:bg-primary/10 transition-all duration-300"
                >
                  <GitHub className="w-6 h-6 group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mchaerulhafiz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full border border-border hover:border-primary bg-background/50 hover:bg-primary/10 transition-all duration-300"
                >
                  <LinkedinIcon className="w-6 h-6 group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="mailto:mchaerulhafiz@gmail.com"
                  className="group p-3 rounded-full border border-border hover:border-primary bg-background/50 hover:bg-primary/10 transition-all duration-300"
                >
                  <Mail className="w-6 h-6 group-hover:text-primary transition-colors" />
                </a>
              </div>

              {/* Tech Stack Preview */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.6s" }}
              >
                <p className="text-sm text-muted-foreground mb-4 text-center lg:text-left">
                  Technologies I work with:
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Javascript",
                    "Node.js",
                    "Anthropic",
                    "OpenAI",
                    "DeepSeek",
                    "Jira",
                    "Puppeteer",
                    "Docker",
                  ].map((tech) => (
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
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary/50 rounded-full mt-2"></div>
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
                <div className="w-2 h-2 rounded-full bg-primary/50"></div>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </>
  );
};

export default Hero;
