"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Save, ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

interface CareerFormProps {
  career?: {
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
  };
  isEdit?: boolean;
}

export function CareerForm({ career, isEdit = false }: CareerFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    company: career?.company || "",
    position: career?.position || "",
    period: career?.period || "",
    duration: career?.duration || "",
    location: career?.location || "",
    type: career?.type || "full-time",
    icon: career?.icon || "",
    color: career?.color || "",
    achievements: career?.achievements || [""],
    technologies: career?.technologies || [""],
    description: career?.description || "",
    published: career?.published || false,
    order: career?.order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const achievements = formData.achievements.filter(a => a.trim());
      const technologies = formData.technologies.filter(t => t.trim());

      const payload = {
        ...formData,
        achievements,
        technologies,
        duration: formData.duration || null,
        location: formData.location || null,
        icon: formData.icon || null,
        color: formData.color || null,
      };

      const url = isEdit ? `/api/career/${career?.id}` : "/api/career";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save career event");
      }

      router.push("/admin/career");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked
        : type === "number" ? parseInt(value) || 0
        : value,
    }));
  };

  const addAchievement = () => setFormData(prev => ({ ...prev, achievements: [...prev.achievements, ""] }));
  const removeAchievement = (index: number) => setFormData(prev => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));
  const updateAchievement = (index: number, value: string) => setFormData(prev => ({ ...prev, achievements: prev.achievements.map((a, i) => i === index ? value : a) }));

  const addTechnology = () => setFormData(prev => ({ ...prev, technologies: [...prev.technologies, ""] }));
  const removeTechnology = (index: number) => setFormData(prev => ({ ...prev, technologies: prev.technologies.filter((_, i) => i !== index) }));
  const updateTechnology = (index: number, value: string) => setFormData(prev => ({ ...prev, technologies: prev.technologies.map((t, i) => i === index ? value : t) }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/admin/career">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Career
          </Button>
        </Link>
      </div>

      <Card className="max-w-4xl mx-auto glass">
        <CardHeader>
          <CardTitle>{isEdit ? "Edit Career Event" : "Create New Career Event"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input id="company" name="company" value={formData.company} onChange={handleChange} required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input id="position" name="position" value={formData.position} onChange={handleChange} required disabled={isLoading} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="period">Period *</Label>
                <Input id="period" name="period" value={formData.period} onChange={handleChange} required placeholder="Sep 2021 - Present" disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="4+ years" disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Jakarta, Indonesia" disabled={isLoading} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <select id="type" name="type" value={formData.type} onChange={handleChange} required disabled={isLoading} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="full-time">Full-time</option>
                  <option value="freelance">Freelance</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="education">Education</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input id="order" name="order" type="number" value={formData.order} onChange={handleChange} disabled={isLoading} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4} disabled={isLoading} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>

            <div className="space-y-2">
              <Label>Achievements *</Label>
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Input value={achievement} onChange={(e) => updateAchievement(index, e.target.value)} placeholder="Achievement description" disabled={isLoading} />
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeAchievement(index)} disabled={formData.achievements.length === 1}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addAchievement}>
                <Plus className="w-4 h-4 mr-2" /> Add Achievement
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Technologies *</Label>
              {formData.technologies.map((tech, index) => (
                <div key={index} className="flex gap-2">
                  <Input value={tech} onChange={(e) => updateTechnology(index, e.target.value)} placeholder="Technology name" disabled={isLoading} />
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeTechnology(index)} disabled={formData.technologies.length === 1}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addTechnology}>
                <Plus className="w-4 h-4 mr-2" /> Add Technology
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="published" name="published" checked={formData.published} onChange={handleChange} disabled={isLoading} className="w-4 h-4" />
              <Label htmlFor="published" className="cursor-pointer">Publish Career Event</Label>
            </div>

            {error && <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20"><p className="text-sm text-destructive">{error}</p></div>}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>) : (<><Save className="w-4 h-4 mr-2" />{isEdit ? "Update Career Event" : "Create Career Event"}</>)}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
