
import type React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface Prompt {
  id: string; 
  title: string;
  prompt: string; 
  category: string; // Category ID
  tools: string[]; 
  isFeatured: boolean;
  description?: string; 
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconEmoji: string; 
  Icon?: LucideIcon; 
}

export interface PromptCollection {
  id: string; 
  name: string; 
  Icon?: LucideIcon; 
  prompts: Prompt[];
}

export type Tag = {
  id: string;
  name: string;
};

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  isCTA?: boolean;
  isPageLink?: boolean; // To differentiate between page links and anchor links
}

// Types for the new /courses page
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "Master";

export interface Course {
  id: string;
  title: string;
  imageUrl: string;
  imageHint?: string; // For AI image search hint
  level: CourseLevel;
  authorName: string;
  authorAvatarUrl: string;
  lessonsCount: number;
  quizCount: number;
  studentCount: number;
  progressPercent: number;
  daysRemaining: string;
}

export interface CourseListingItem {
  id: string;
  name: string;
  category: string;
  level: CourseLevel;
  tools: string;
  lessonsDescription: string; // e.g., "25 tutorials"
  pointsRequired: number;
}
