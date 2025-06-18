
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
import { UserCircle, Heart, UploadCloud, Settings as SettingsIcon, LogOut, Edit3, Shield, Bell } from "lucide-react";

const profileSidebarNavItems = [
  { label: "Profile Info", href: "/profile", icon: UserCircle, isActive: true },
  { label: "Favorite Prompts", href: "#", icon: Heart, isActive: false },
  { label: "My Uploaded Prompts", href: "#", icon: UploadCloud, isActive: false },
  { label: "Account Settings", href: "#", icon: SettingsIcon, isActive: false },
  { label: "Security", href: "#", icon: Shield, isActive: false },
  { label: "Notifications", href: "#", icon: Bell, isActive: false },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-1 mt-0">
          <Sidebar collapsible="icon" className="hidden md:flex border-r bg-sidebar text-sidebar-foreground">
            <SidebarContent className="p-2">
              <SidebarMenu>
                {profileSidebarNavItems.map((item, index) => (
                  <SidebarMenuItem key={item.label} className="animate-fadeIn opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
                    <SidebarMenuButton asChild tooltip={item.label} isActive={item.isActive}>
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
              <SidebarMenu className="animate-fadeIn opacity-0" style={{ animationDelay: `${profileSidebarNavItems.length * 100}ms` }}>
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
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Profile Information</h1>
                  <Button variant="outline" className="w-full sm:w-auto">
                     <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                </div>

                <Card className="shadow-lg rounded-xl overflow-hidden animate-fadeIn opacity-0" style={{ animationDelay: '200ms' }}>
                  <CardHeader>
                    <CardTitle className="text-xl">User Details</CardTitle>
                    <CardDescription>Manage your personal information and account settings.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-muted-foreground mb-1">Full Name</h3>
                        <p className="text-foreground">John Doe (Placeholder)</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-muted-foreground mb-1">Email Address</h3>
                        <p className="text-foreground">john.doe@example.com (Placeholder)</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-muted-foreground mb-1">Member Since</h3>
                        <p className="text-foreground">January 1, 2024 (Placeholder)</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-muted-foreground mb-1">Subscription Plan</h3>
                        <p className="text-foreground">Free Tier (Placeholder)</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border/50">
                        <h3 className="text-lg font-semibold text-foreground mb-3">Bio</h3>
                        <p className="text-muted-foreground italic">
                            This is a placeholder bio. Users will be able to update this section with their personal or professional information.
                            It can include interests, expertise, or how they use AI prompts.
                        </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Add more profile sections as needed, e.g., change password, linked accounts */}

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
