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
  iconEmoji: string; // Kept for potential future use or data consistency from source
  Icon?: LucideIcon; // Mapped Lucide icon component
}

export interface PromptCollection {
  id: string; // Category ID acts as collection ID
  name: string; // Category name
  Icon?: LucideIcon; // Category icon
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
}
