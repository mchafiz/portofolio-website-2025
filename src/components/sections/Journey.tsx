"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Download,
  Image as ImageIcon,
  FileText,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Journey = () => {
  const parallax = useParallax(0.2);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const experiences = [
    {
      company: "Inovasi Informatika Indonesia, PT",
      position: "Software Engineer | DevSecOps & QA Automation",
      period: "Sep 2021 - Present",
      duration: "4+ years",
      location: "Jakarta Selatan, Indonesia",
      type: "full-time",
      icon: Shield,
      color: "from-blue-600 to-purple-600",
      achievements: [
        "Led frontend development of i3gis DevSecOps Tools using React.js and Next.js",
        "Implemented QA automation with Playwright for security modules (DAST, SAST, SCA)",
        "Developed DevSecOps modules optimizing security workflows and processes",
        "Built license management dashboard for product access control and monitoring",
        "Integrated Ansible with Next.js for real-time infrastructure monitoring",
        "Developed Oli3 - internal ERP system (timesheet, KPI, training, leave management)",
        "Created issue data bank system for AI LLM development using Node.js and Kafka",
        "Integrated ITSM applications (Jira, ServiceNow) via REST APIs for vulnerability ticketing",
      ],
      technologies: [
        "React.js",
        "Next.js",
        "Node.js",
        "Playwright",
        "Nest.js",
        "Kafka",
        "Clickhouse",
      ],
      description:
        "As a Software Engineer at Inovasi Informatika Indonesia, I specialize in enterprise DevSecOps solutions. I led the full-stack development of the i3gis DevSecOps dashboard, implementing cutting-edge security automation and modern web technologies to serve real enterprise users.",
      images: [
        {
          url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
          caption: "i3gis DevSecOps Dashboard",
        },
        {
          url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
          caption: "QA Automation Testing",
        },
      ],
      files: [
        {
          name: "Certificate of Employment.pdf",
          type: "pdf",
          url: "#",
        },
        {
          name: "Project Portfolio.pdf",
          type: "pdf",
          url: "#",
        },
      ],
    },
    {
      company: "PT. Teknologi Karya Indonesia",
      position: "Software Engineer & System Administrator",
      period: "Sep 2020 - Feb 2021",
      duration: "6 months",
      location: "Jakarta, Indonesia",
      type: "freelance",
      icon: Cloud,
      color: "from-green-600 to-teal-600",
      achievements: [
        "Enhanced Enterprise Resource Planning (ERP) systems",
        "Built Flutter-based mobile applications",
        "Managed Google Cloud infrastructure and servers",
        "Resolved ERP (Adempiere) system issues",
        "Generated custom reports using JasperReports",
      ],
      technologies: [
        "Flutter",
        "Java",
        "Google Cloud",
        "Adempiere",
        "JasperReports",
      ],
    },
    {
      company: "Mobile & Full Stack Developer – Research & Development",
      position: "Mobile & Full Stack Developer",
      period: "Apr 2021 - Oct 2021",
      duration: "7 months",
      location: "Jakarta Raya, Indonesia",
      type: "full-time",
      icon: Smartphone,
      color: "from-purple-600 to-pink-600",
      achievements: [
        "Designed UI/UX for Fusion Training mobile app",
        "Developed mobile app using Dart and Flutter",
        "Built admin dashboard using PHP Laravel",
        "Defined application flow and business logic",
        "Conducted testing across multiple devices",
      ],
      technologies: ["Flutter", "Dart", "PHP", "Laravel"],
    },
    {
      company: "Lembaga Pengembangan Komputerisasi Universitas Gunadarma",
      position: "Technician",
      period: "Jun 2018 - Jan 2021",
      duration: "2.5 years",
      location: "Bogor, Indonesia",
      type: "contract",
      icon: Server,
      color: "from-orange-600 to-red-600",
      achievements: [
        "Maintained IT infrastructure and VMware vSphere",
        "Administered Windows Server user accounts",
        "Managed Moodle-based learning management systems",
      ],
      technologies: ["VMware", "Windows Server", "Moodle", "RDP"],
    },
    {
      company: "Universitas Gunadarma",
      position: "Computer Lab Assistant",
      period: "Sep 2017 - Jan 2021",
      duration: "3.5 years",
      location: "Bogor, Indonesia",
      type: "part-time",
      icon: GraduationCap,
      color: "from-indigo-600 to-blue-600",
      achievements: [
        "Mentored students in web programming and Linux server administration",
        "Assisted in MikroTik and Cisco networking training sessions",
        "Maintained computer lab infrastructure and hardware systems",
        "Supported faculty members in conducting IT practical sessions",
      ],
      technologies: ["Linux", "MikroTik", "Cisco", "Web Programming"],
    },
    {
      company: "Mitra Solusi Infokom (MSInfokom)",
      position: "Project Intern",
      period: "Feb 2019",
      duration: "1 month",
      location: "Jakarta Raya, Indonesia",
      type: "internship",
      icon: Terminal,
      color: "from-gray-600 to-slate-600",
      achievements: [
        "Server mounting and migration project",
        "Worked at Bareskrim CCIC (Cyber Crime Investigation Centre) POLRI",
      ],
      technologies: ["Server Migration", "Hardware Setup"],
    },
  ];

  return (
    <>
      <section id="journey" className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div
          className="absolute left-10 top-10 text-[10rem] font-bold bg-gradient-to-br from-primary/10 to-primary/2 bg-clip-text text-transparent pointer-events-none animate-float"
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
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
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  } animate-slide-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/50 z-10">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping"></div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "pr-8" : "pl-8 ml-auto"
                    }`}
                  >
                    <Card className="glass hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] cursor-pointer">
                      <div onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg bg-gradient-to-r ${exp.color} bg-opacity-10`}
                              >
                                <exp.icon className="w-5 h-5" />
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
                              .slice(0, expandedIndex === index ? undefined : 3)
                              .map((achievement, i) => (
                                <p
                                  key={i}
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                >
                                  <ChevronRight className="w-3 h-3 mt-1 text-primary flex-shrink-0" />
                                  <span>{achievement}</span>
                                </p>
                              ))}
                            {exp.achievements.length > 3 && expandedIndex !== index && (
                              <p className="text-sm text-primary hover:text-primary/80">
                                +{exp.achievements.length - 3} more achievements
                              </p>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.slice(0, expandedIndex === index ? undefined : 4).map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {exp.technologies.length > 4 && expandedIndex !== index && (
                              <Badge variant="outline" className="text-xs">
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
                              <div className="grid grid-cols-2 gap-3">
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
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-8 group hover:border-primary transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              More Detail Download CV
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
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
