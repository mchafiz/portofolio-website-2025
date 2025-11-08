"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

interface CareerEvent {
  id: string;
  company: string;
  position: string;
  period: string;
  duration?: string | null;
  location?: string | null;
  type: string;
  achievements: string[];
  technologies: string[];
  description: string;
  published: boolean;
  order: number;
  createdAt: string;
}

export default function CareerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [careerEvents, setCareerEvents] = useState<CareerEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchCareerEvents();
    }
  }, [status]);

  const fetchCareerEvents = async () => {
    try {
      const response = await fetch("/api/career");
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this career event?")) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/career/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCareerEvents(careerEvents.filter((event) => event.id !== id));
      } else {
        alert("Failed to delete career event");
      }
    } catch (error) {
      console.error("Failed to delete career event:", error);
      alert("Failed to delete career event");
    } finally {
      setDeletingId(null);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const typeColors: Record<string, string> = {
    "full-time": "bg-blue-500/10 text-blue-500",
    "freelance": "bg-purple-500/10 text-purple-500",
    "contract": "bg-orange-500/10 text-orange-500",
    "internship": "bg-green-500/10 text-green-500",
    "education": "bg-pink-500/10 text-pink-500",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Career Roadmap</h1>
            <p className="text-muted-foreground">
              Create and manage your career timeline events
            </p>
          </div>
          <Link href="/admin/career/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{careerEvents.length}</div>
              <p className="text-sm text-muted-foreground">Total Events</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {careerEvents.filter((e) => e.published).length}
              </div>
              <p className="text-sm text-muted-foreground">Published</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {careerEvents.filter((e) => e.type === "full-time").length}
              </div>
              <p className="text-sm text-muted-foreground">Full-time Positions</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {careerEvents.filter((e) => e.type === "education").length}
              </div>
              <p className="text-sm text-muted-foreground">Education</p>
            </CardContent>
          </Card>
        </div>

        {/* Career Events Table */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>All Career Events</CardTitle>
          </CardHeader>
          <CardContent>
            {careerEvents.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  No career events yet. Create your first event!
                </p>
                <Link href="/admin/career/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Position</th>
                      <th className="text-left p-4">Company</th>
                      <th className="text-left p-4">Period</th>
                      <th className="text-left p-4">Type</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {careerEvents.map((event) => (
                      <tr
                        key={event.id}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{event.position}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {event.description}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium">{event.company}</div>
                          {event.location && (
                            <div className="text-sm text-muted-foreground">
                              {event.location}
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="text-sm">{event.period}</div>
                          {event.duration && (
                            <div className="text-xs text-muted-foreground">
                              {event.duration}
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={typeColors[event.type] || ""}
                          >
                            {event.type}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {event.published ? (
                              <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                                <Eye className="w-3 h-3 mr-1" />
                                Published
                              </Badge>
                            ) : (
                              <Badge variant="secondary">
                                <EyeOff className="w-3 h-3 mr-1" />
                                Draft
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/career/${event.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(event.id)}
                              disabled={deletingId === event.id}
                            >
                              {deletingId === event.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4 text-destructive" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
