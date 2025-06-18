
"use client";

import type React from 'react';
import Link from 'next/link';
import { Navbar } from "@/components/navbar";
import { Container } from "@/components/container";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PromptCard } from '@/components/prompt-card';
import type { Prompt } from '@/types';

import { UserCircle, Heart, UploadCloud, Settings as SettingsIcon, LogOut, Zap } from "lucide-react";

// Placeholder data for prompt cards
const placeholderPrompts: Prompt[] = [
  {
    id: "dash-pm1",
    title: "My Favorite Marketing Prompt",
    prompt: "Generate a compelling tagline for a new eco-friendly coffee brand that emphasizes sustainability and premium quality.",
    category: "marketing",
    tools: ["ChatGPT", "Claude"],
    isFeatured: false,
    description: "A quick prompt to get taglines."
  },
  {
    id: "dash-pc1",
    title: "Quick Blog Post Idea",
    prompt: "Brainstorm 5 blog post ideas for a travel blog focusing on budget-friendly European destinations.",
    category: "content",
    tools: ["DeepSeek"],
    isFeatured: false,
    description: "Ideas for travel content."
  },
  {
    id: "dash-pb1",
    title: "Startup Pitch Elevator",
    prompt: "Craft a 30-second elevator pitch for a mobile app that connects local artists with buyers.",
    category: "business",
    tools: ["Grok", "ChatGPT"],
    isFeatured: false,
    description: "Short and punchy pitch."
  },
];

const sidebarNavItems = [
  { label: "Profile Info", href: "/profile", icon: UserCircle }, // Updated to /profile
  { label: "Favorite Prompts", href: "#", icon: Heart },
  { label: "My Uploaded Prompts", href: "#", icon: UploadCloud },
  { label: "Settings", href: "#", icon: SettingsIcon },
];

export default function DashboardPage() {
  // In a real app, check authentication status here
  // For now, we assume the user is logged in to see the dashboard

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-1 mt-0"> 
          <Sidebar collapsible="icon" className="hidden md:flex border-r bg-sidebar text-sidebar-foreground">
            <SidebarContent className="p-2">
              <SidebarMenu>
                {sidebarNavItems.map((item, index) => (
                  <SidebarMenuItem key={item.label} className="animate-fadeIn opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
                    <SidebarMenuButton asChild tooltip={item.label} isActive={item.href === "/dashboard"} >
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-2">
              <SidebarMenu className="animate-fadeIn opacity-0" style={{ animationDelay: `${sidebarNavItems.length * 100}ms` }}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Logout">
                    <Link href="#"> 
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <main className="flex-grow p-4 sm:p-6 md:p-8 animate-fadeIn opacity-0" style={{ animationDelay: '100ms' }}>
              <Container>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">My Prompts Dashboard</h1>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                     <Zap className="mr-2 h-4 w-4" /> Create New Prompt
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {placeholderPrompts.length > 0 ? (
                    placeholderPrompts.map((prompt, index) => (
                      <PromptCard
                        key={prompt.id || index}
                        prompt={prompt}
                        animationDelay={`${(index + 1) * 150 + 200}ms`}
                      />
                    ))
                  ) : (
                    <Card className="md:col-span-2 xl:col-span-3 animate-fadeIn opacity-0" style={{ animationDelay: '300ms' }}>
                      <CardHeader>
                        <CardTitle>No Prompts Yet</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Start by creating or uploading your first prompt!</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </Container>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
       <footer className="py-8 mt-auto border-t border-border/50 animate-fadeIn opacity-0" style={{ animationDelay: '500ms' }}>
        <Container className="text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Promptly. All rights reserved.</p>
          <p className="mt-1">Your personal AI prompt command center.</p>
        </Container>
      </footer>
    </div>
  );
}

    