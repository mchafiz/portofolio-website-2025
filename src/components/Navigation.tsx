"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import FishCakeIcon from "@/components/FishCakeIcon";
import Image from "next/image";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isManualScroll, setIsManualScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Skip scroll detection if it's a manual scroll (from clicking nav)
      if (isManualScroll) return;

      const sections = [
        "home",
        "about",
        "journey",
        "projects",
        "articles",
        "contact",
      ];
      const scrollPosition = window.scrollY;
      const viewportMiddle = scrollPosition + window.innerHeight / 2;

      // Find the section that's currently most visible in the viewport
      let closestSection = "home";
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + scrollPosition;
          const sectionBottom = sectionTop + rect.height;
          const sectionCenter = (sectionTop + sectionBottom) / 2;

          // Calculate distance from viewport center to section center
          const distance = Math.abs(viewportMiddle - sectionCenter);

          // Only consider section if it's in viewport or near viewport
          if (
            sectionBottom > scrollPosition &&
            sectionTop < scrollPosition + window.innerHeight
          ) {
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = section;
            }
          }
        }
      });

      setActiveSection(closestSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScroll]);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Journey", href: "#journey" },
    { label: "Projects", href: "#projects" },
    { label: "Articles", href: "#articles" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="text-2xl font-bold flex items-center gap-2"
            >
              <Image
                src="/fish-cake.png"
                alt="FishCake Icon"
                width={25}
                height={25}
                className="w-8 h-8"
              />
              FishCake-Dev
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const sectionId = item.href.slice(1);
                    setActiveSection(sectionId);
                    setIsManualScroll(true);

                    const target = document.querySelector(item.href);
                    if (target) {
                      const targetPosition =
                        target.getBoundingClientRect().top +
                        window.pageYOffset -
                        80;
                      window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                      });

                      // Re-enable automatic scroll detection after scroll completes
                      setTimeout(() => {
                        setIsManualScroll(false);
                      }, 600);
                    }
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? "text-primary bg-primary/10 shadow-lg shadow-primary/20 nav-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const sectionId = item.href.slice(1);
                  setActiveSection(sectionId);
                  setIsManualScroll(true);
                  setIsOpen(false);

                  const target = document.querySelector(item.href);
                  if (target) {
                    const targetPosition =
                      target.getBoundingClientRect().top +
                      window.pageYOffset -
                      80;
                    window.scrollTo({
                      top: targetPosition,
                      behavior: "smooth",
                    });

                    // Re-enable automatic scroll detection after scroll completes
                    setTimeout(() => {
                      setIsManualScroll(false);
                    }, 600);
                  }
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-primary bg-primary/10 shadow-lg shadow-primary/20 nav-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
