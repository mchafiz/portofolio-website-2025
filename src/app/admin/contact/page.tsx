"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Calendar,
  User,
  MessageSquare,
  Trash2,
  CheckCircle2,
  Circle,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contact/all");
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentStatus }),
      });

      if (response.ok) {
        setContacts((prev) =>
          prev.map((contact) =>
            contact.id === id ? { ...contact, read: !currentStatus } : contact
          )
        );
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setContacts((prev) => prev.filter((contact) => contact.id !== id));
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
            <p className="text-muted-foreground">
              Manage and respond to contact form submissions
            </p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {unreadCount} Unread
          </Badge>
        </div>
      </div>

      {contacts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground">
              Contact form submissions will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card
              key={contact.id}
              className={`transition-all ${
                !contact.read
                  ? "border-primary/50 bg-primary/5"
                  : "border-border"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {contact.read ? (
                        <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <Circle className="w-5 h-5 text-primary fill-primary" />
                      )}
                      <CardTitle className="text-xl">
                        {contact.subject}
                      </CardTitle>
                      {!contact.read && (
                        <Badge variant="default" className="ml-2">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground ml-8">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{contact.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a
                          href={`mailto:${contact.email}`}
                          className="hover:text-primary hover:underline"
                        >
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(contact.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleReadStatus(contact.id, contact.read)}
                      className="gap-2"
                    >
                      {contact.read ? (
                        <>
                          <Circle className="w-4 h-4" />
                          Mark Unread
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Mark Read
                        </>
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteContact(contact.id)}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2 bg-muted/30 p-4 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <p className="text-sm whitespace-pre-wrap flex-1">
                    {contact.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
