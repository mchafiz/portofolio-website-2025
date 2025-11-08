"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Save, ArrowLeft, Plus, X, Upload, Image as ImageIcon, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  const [uploadingFile, setUploadingFile] = useState(false);

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
    images: career?.images || [],
    files: career?.files || [],
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
        images: formData.images.length > 0 ? formData.images : null,
        files: formData.files.length > 0 ? formData.files : null,
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

  // Image handlers
  const addImage = () => setFormData(prev => ({ ...prev, images: [...prev.images, { url: "", caption: "" }] }));
  const removeImage = (index: number) => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  const updateImage = (index: number, field: "url" | "caption", value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? { ...img, [field]: value } : img)
    }));
  };

  // File handlers
  const addFile = () => setFormData(prev => ({ ...prev, files: [...prev.files, { name: "", type: "", url: "" }] }));
  const removeFile = (index: number) => setFormData(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }));
  const updateFile = (index: number, field: "name" | "type" | "url", value: string) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.map((file, i) => i === index ? { ...file, [field]: value } : file)
    }));
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setUploadingFile(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();

      // Update the file URL in form data
      updateFile(index, "url", data.url);
      updateFile(index, "name", file.name);
      updateFile(index, "type", "pdf");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload file");
    } finally {
      setUploadingFile(false);
    }
  };

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

            {/* Images Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <Label>Images</Label>
              </div>
              <p className="text-sm text-muted-foreground">Add screenshots, project images, or certificates</p>
              {formData.images.map((image, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg">
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-2">
                      <Input
                        value={image.url}
                        onChange={(e) => updateImage(index, "url", e.target.value)}
                        placeholder="Image URL (e.g., https://example.com/image.jpg)"
                        disabled={isLoading}
                      />
                      <Input
                        value={image.caption}
                        onChange={(e) => updateImage(index, "caption", e.target.value)}
                        placeholder="Image caption"
                        disabled={isLoading}
                      />
                      {image.url && (
                        <div className="relative w-full h-40 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={image.url}
                            alt={image.caption || "Preview"}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="self-start"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addImage}>
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>

            {/* Files Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <Label>Files (CV, Certificates, Documents)</Label>
              </div>
              <p className="text-sm text-muted-foreground">Upload PDF files for CV, certificates, or other documents (max 10MB)</p>
              {formData.files.map((file, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg bg-muted/50">
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={file.name}
                          onChange={(e) => updateFile(index, "name", e.target.value)}
                          placeholder="File display name (e.g., Certificate of Employment)"
                          disabled={isLoading}
                          className="flex-1"
                        />
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileUpload(e, index)}
                            disabled={isLoading || uploadingFile}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id={`file-upload-${index}`}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={isLoading || uploadingFile}
                            asChild
                          >
                            <label htmlFor={`file-upload-${index}`} className="cursor-pointer">
                              {uploadingFile ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Uploading...
                                </>
                              ) : (
                                <>
                                  <Upload className="w-4 h-4 mr-2" />
                                  Upload PDF
                                </>
                              )}
                            </label>
                          </Button>
                        </div>
                      </div>
                      {file.url && (
                        <div className="flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/20 rounded-md">
                          <FileText className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-500 flex-1">File uploaded successfully</span>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            Preview
                          </a>
                        </div>
                      )}
                      <Input
                        value={file.url}
                        onChange={(e) => updateFile(index, "url", e.target.value)}
                        placeholder="Or paste file URL manually"
                        disabled={isLoading}
                        className="text-xs"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="self-start"
                      disabled={isLoading}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addFile} disabled={isLoading}>
                <Plus className="w-4 h-4 mr-2" /> Add File
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
