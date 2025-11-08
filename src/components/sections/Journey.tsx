"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParallax } from "@/hooks/use-parallax";
import { GradientText } from "@/components/ui/gradient-text";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
  ChevronDown,
  Terminal,
  Shield,
  Smartphone,
  Cloud,
  GraduationCap,
  Server,
  Code,
  Image as ImageIcon,
  FileText,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CareerEvent {
  id: string;
  company: string;
  position: string;
  period: string;
  duration?: string | null;
  location?: string | null;
  type: string;
  icon?: string | null;
  color?: string | null;
  achievements: string[];
  technologies: string[];
  description: string;
  images?: Array<{ url: string; caption: string }> | null;
  files?: Array<{ name: string; type: string; url: string }> | null;
  published: boolean;
  order: number;
}

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Cloud,
  Terminal,
  Smartphone,
  GraduationCap,
  Server,
  Code,
  Briefcase,
};

const Journey = () => {
  const parallax = useParallax(0.2);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [careerEvents, setCareerEvents] = useState<CareerEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareerEvents = async () => {
      try {
        const response = await fetch("/api/career?published=true");
        if (response.ok) {
          const data = await response.json();
          setCareerEvents(data);
        }
      } catch (error) {
        console.error("Failed to fetch career events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchActiveCV = async () => {
      try {
        const response = await fetch("/api/cv");
        if (response.ok) {
          const data = await response.json();
          if (data && data.fileUrl) {
            setCvUrl(data.fileUrl);
          }
        }
      } catch (error) {
        console.error("Failed to fetch CV:", error);
      }
    };

    fetchCareerEvents();
    fetchActiveCV();
  }, []);

  return (
    <>
      <section id="journey" className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div
          className="absolute left-10 top-10 text-[5rem] sm:text-[7rem] md:text-[10rem] font-bold bg-gradient-to-br from-primary/10 to-primary/2 bg-clip-text text-transparent pointer-events-none animate-float"
          style={parallax}
        >
          {"</>"}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Briefcase className="w-4 h-4 mr-2" />
              Professional Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <GradientText
                from="from-blue-600"
                via="via-purple-600"
                to="to-pink-600"
                animate={true}
                animationType="shift"
              >
                My Career Roadmap
              </GradientText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A journey through various roles and technologies, from system
              administration to DevSecOps and full-stack development
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Briefcase className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : careerEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Briefcase className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No Career Events Found
                </h3>
                <p className="text-muted-foreground">
                  Check back later for updates
                </p>
              </div>
            ) : (
              <>
                {/* Timeline Line - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"></div>

                {/* Timeline Items */}
                <div className="space-y-8 md:space-y-12">
                  {careerEvents.map((exp, index) => (
                    <div
                      key={index}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? "justify-start" : "md:justify-end"
                      } animate-slide-up`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Timeline Dot - Hidden on mobile */}
                      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/50 z-10">
                        <div className="absolute inset-0 bg-primary rounded-full animate-ping"></div>
                      </div>

                      {/* Content Card */}
                      <div
                        className={`w-full md:w-5/12 ${
                          index % 2 === 0 ? "md:pr-8" : "md:pl-8 md:ml-auto"
                        }`}
                      >
                        <Card className="glass hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] cursor-pointer">
                          <div
                            onClick={() =>
                              setExpandedIndex(
                                expandedIndex === index ? null : index
                              )
                            }
                          >
                            <CardHeader className="pb-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`p-2 rounded-lg bg-gradient-to-r ${
                                      exp.color || "from-blue-600 to-purple-600"
                                    } bg-opacity-10`}
                                  >
                                    {(() => {
                                      const IconComponent =
                                        typeof exp.icon === "string"
                                          ? iconMap[exp.icon] || Briefcase
                                          : exp.icon || Briefcase;
                                      return (
                                        <IconComponent className="w-5 h-5" />
                                      );
                                    })()}
                                  </div>
                                  <div>
                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                      {exp.company}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground font-medium">
                                      {exp.position}
                                    </p>
                                  </div>
                                </div>
                                <ChevronDown
                                  className={cn(
                                    "w-5 h-5 text-primary transition-transform duration-300",
                                    expandedIndex === index && "rotate-180"
                                  )}
                                />
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{exp.period}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{exp.location}</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {exp.achievements
                                  .slice(
                                    0,
                                    expandedIndex === index ? undefined : 3
                                  )
                                  .map((achievement, i) => (
                                    <p
                                      key={i}
                                      className="text-sm text-muted-foreground flex items-start gap-2"
                                    >
                                      <ChevronRight className="w-3 h-3 mt-1 text-primary flex-shrink-0" />
                                      <span>{achievement}</span>
                                    </p>
                                  ))}
                                {exp.achievements.length > 3 &&
                                  expandedIndex !== index && (
                                    <p className="text-sm text-primary hover:text-primary/80">
                                      +{exp.achievements.length - 3} more
                                      achievements
                                    </p>
                                  )}
                              </div>

                              <div className="flex flex-wrap gap-2 mt-4">
                                {exp.technologies
                                  .slice(
                                    0,
                                    expandedIndex === index ? undefined : 4
                                  )
                                  .map((tech) => (
                                    <Badge
                                      key={tech}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                {exp.technologies.length > 4 &&
                                  expandedIndex !== index && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      +{exp.technologies.length - 4}
                                    </Badge>
                                  )}
                              </div>
                            </CardContent>
                          </div>

                          {/* Expanded Content */}
                          {expandedIndex === index && exp.description && (
                            <CardContent className="pt-0 space-y-6 border-t border-border/50 mt-4">
                              {/* Description */}
                              <div className="pt-4">
                                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                  <Briefcase className="w-4 h-4 text-primary" />
                                  About This Role
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {exp.description}
                                </p>
                              </div>

                              {/* Images */}
                              {exp.images && exp.images.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-primary" />
                                    Project Gallery
                                  </h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {exp.images.map((img, imgIndex) => (
                                      <div
                                        key={imgIndex}
                                        className="relative group overflow-hidden rounded-lg border border-border/50 hover:border-primary/50 transition-all"
                                      >
                                        <div className="relative aspect-video">
                                          <Image
                                            src={img.url}
                                            alt={img.caption}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                          <p className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            {img.caption}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Files */}
                              {exp.files && exp.files.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    Documents & Certificates
                                  </h4>
                                  <div className="space-y-2">
                                    {exp.files.map((file, fileIndex) => (
                                      <a
                                        key={fileIndex}
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="p-2 bg-primary/10 rounded-lg">
                                            <FileText className="w-4 h-4 text-primary" />
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-foreground">
                                              {file.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground uppercase">
                                              {file.type}
                                            </p>
                                          </div>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
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
                <Briefcase className="w-4 h-4 text-primary/50" />
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Journey;
