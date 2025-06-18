
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCircle, LayoutGrid, Settings, Shield, Bell, LogOut, UploadCloud } from "lucide-react";

// Updated sidebar navigation items for the profile page
const profileSidebarNavItems = [
  { label: "Profile Overview", href: "/profile", icon: UserCircle, isActive: true },
  { label: "My Prompts", href: "/dashboard", icon: LayoutGrid, isActive: false }, // Link to dashboard where prompts are shown
  { label: "Account Settings", href: "#settings", icon: Settings, isActive: false },
  { label: "Security", href: "#security", icon: Shield, isActive: false },
  { label: "Notifications", href: "#notifications", icon: Bell, isActive: false },
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
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Profile & Account Management</h1>
                  <p className="text-muted-foreground mt-1">Manage your profile details and account settings.</p>
                </div>

                <Card className="shadow-lg rounded-xl overflow-hidden animate-fadeIn opacity-0" style={{ animationDelay: '200ms' }}>
                  <CardHeader>
                    <CardTitle className="text-xl">User Profile</CardTitle>
                    <CardDescription>Update your personal information and preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Avatar Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                      <Avatar className="h-24 w-24 border-2 border-primary shadow-md">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="avatar person" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-2 items-center sm:items-start">
                         <Button variant="outline">
                           <UploadCloud className="mr-2 h-4 w-4" /> Change Avatar
                         </Button>
                         <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB.</p>
                      </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-foreground border-b pb-2">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <Label htmlFor="displayName">Display Name</Label>
                          <Input id="displayName" placeholder="John Doe" defaultValue="John Doe (Placeholder)" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" placeholder="john.doe@example.com" defaultValue="john.doe@example.com (Placeholder)" readOnly className="bg-muted/50 cursor-not-allowed" />
                           <Button variant="link" className="p-0 h-auto text-xs text-primary hover:underline">Change Email</Button>
                        </div>
                      </div>
                       <div className="space-y-1.5">
                          <Label htmlFor="bio">Bio</Label>
                          <textarea 
                            id="bio" 
                            placeholder="Tell us a bit about yourself..." 
                            className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue="AI enthusiast and prompt engineer. Exploring the creative potential of large language models. (Placeholder)"
                          />
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-foreground border-b pb-2">Change Password</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" placeholder="Enter current password" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" placeholder="Enter new password" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
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

    