
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
  Icon?: LucideIcon; // Mapped Lucide icon component
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
}
