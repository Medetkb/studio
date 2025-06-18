
// @ts-nocheck
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, LayoutDashboard, User, MessageSquare, Zap } from "lucide-react"; // Changed LayoutGrid to LayoutDashboard
import { Container } from "./container";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";
import React from "react";
import { ThemeToggleButton } from "./theme-toggle-button";

const navItems: NavItem[] = [
  { href: "#curated-collections-search-section", label: "Search", icon: Search, isPageLink: false },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, isPageLink: true }, // Changed from Courses to Dashboard
  { href: "#upgrade-pro-section", label: "Upgrade to PRO", icon: Zap, isCTA: true, isPageLink: false },
  { href: "#profile", label: "Profile", icon: User, isPageLink: false },
  { href: "#feedback", label: "Feedback", icon: MessageSquare, isPageLink: false },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-foreground">Promptly</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-grow">
          {navItems.map((item) => {
            if (item.isCTA) return null;
            const LinkComponent = item.isPageLink ? Link : 'a';
            return (
              <LinkComponent
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-primary text-foreground/80"
              >
                {item.label}
              </LinkComponent>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center space-x-2 ml-auto">
          <ThemeToggleButton />
          {navItems.find(item => item.isCTA) && (
             <Button
                variant="default"
                size="sm"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href={navItems.find(item => item.isCTA)!.href}>
                  {navItems.find(item => item.isCTA)!.icon && React.createElement(navItems.find(item => item.isCTA)!.icon!, { className: "mr-2 h-4 w-4" })}
                  {navItems.find(item => item.isCTA)!.label}
                </Link>
              </Button>
          )}
          {navItems.filter(item => !item.isCTA && (item.label === "Profile" || item.label === "Feedback")).map(item => (
            <Button key={item.label} variant="ghost" size="icon" asChild>
               <Link href={item.href} aria-label={item.label}>
                {item.icon && React.createElement(item.icon, { className: "h-5 w-5 text-foreground/80 hover:text-primary"})}
               </Link>
            </Button>
          ))}
        </div>


        <div className="flex md:hidden items-center ml-auto">
          <ThemeToggleButton />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-foreground/80" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background">
              <div className="flex flex-col space-y-4 p-6">
                <Link href="/" className="mb-4 flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Zap className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">Promptly</span>
                </Link>
                {navItems.map((item) => {
                  const LinkComponent = item.isPageLink ? Link : 'a';
                  return (
                    <LinkComponent
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        item.isCTA ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "text-foreground/80"
                      )}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />}
                      <span>{item.label}</span>
                    </LinkComponent>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
