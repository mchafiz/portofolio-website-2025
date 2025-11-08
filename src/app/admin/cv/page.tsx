"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Upload,
  Trash2,
  Loader2,
  ArrowLeft,
  FileText,
  CheckCircle2,
  Download,
  Eye,
} from "lucide-react";
import Link from "next/link";

interface CV {
  id: string;
  fileName: string;
  fileUrl: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CVManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAllCVs();
    }
  }, [status]);

  const fetchAllCVs = async () => {
    try {
      const response = await fetch("/api/cv/all");
      if (response.ok) {
        const data = await response.json();
        setCvs(data);
      }
    } catch (error) {
      console.error("Failed to fetch CVs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Upload file first
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      const uploadData = await uploadResponse.json();

      // Create CV record
      const cvResponse = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileUrl: uploadData.url,
          description: description || null,
        }),
      });

      if (!cvResponse.ok) {
        throw new Error("Failed to create CV record");
      }

      // Reset form
      setSelectedFile(null);
      setDescription("");
      const fileInput = document.getElementById("cv-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      // Refresh list
      fetchAllCVs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload CV");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this CV?")) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/cv/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCvs(cvs.filter((cv) => cv.id !== id));
      } else {
        alert("Failed to delete CV");
      }
    } catch (error) {
      console.error("Failed to delete CV:", error);
      alert("Failed to delete CV");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/cv/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchAllCVs();
      } else {
        alert("Failed to update CV status");
      }
    } catch (error) {
      console.error("Failed to update CV:", error);
      alert("Failed to update CV");
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

  const activeCV = cvs.find((cv) => cv.isActive);

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

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">CV Management</h1>
          <p className="text-muted-foreground">
            Upload and manage your CV/Resume files
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload New CV
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cv-file">CV File (PDF, max 10MB)</Label>
                <Input
                  id="cv-file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Updated CV 2024"
                  disabled={isUploading}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload CV
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Active CV Info */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Active CV
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeCV ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-green-500 mt-1" />
                        <div>
                          <p className="font-medium text-green-500">
                            {activeCV.fileName}
                          </p>
                          {activeCV.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {activeCV.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            Uploaded: {new Date(activeCV.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={activeCV.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </a>
                    <a
                      href={activeCV.fileUrl}
                      download
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No active CV. Upload one to get started!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CV History */}
        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle>All CVs</CardTitle>
          </CardHeader>
          <CardContent>
            {cvs.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  No CVs uploaded yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cvs.map((cv) => (
                  <div
                    key={cv.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      cv.isActive
                        ? "bg-green-500/5 border-green-500/20"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className={`w-5 h-5 ${cv.isActive ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{cv.fileName}</p>
                            {cv.isActive && (
                              <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs rounded-full">
                                Active
                              </span>
                            )}
                          </div>
                          {cv.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {cv.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(cv.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a href={cv.fileUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </a>
                        {!cv.isActive && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleActive(cv.id, cv.isActive)}
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(cv.id)}
                          disabled={deletingId === cv.id}
                        >
                          {deletingId === cv.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-destructive" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
