"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CareerForm } from "@/components/admin/career-form";
import { Loader2 } from "lucide-react";

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

export default function EditCareerPage() {
  const params = useParams();
  const router = useRouter();
  const [career, setCareer] = useState<CareerEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await fetch(`/api/career/${params.id}`);
        if (!response.ok) {
          throw new Error("Career event not found");
        }
        const data = await response.json();
        setCareer(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load career event");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCareer();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || "Career event not found"}</p>
          <button
            onClick={() => router.push("/admin/career")}
            className="text-primary hover:underline"
          >
            Back to Career Events
          </button>
        </div>
      </div>
    );
  }

  return <CareerForm career={career} isEdit={true} />;
}
