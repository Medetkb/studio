
import type React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface Prompt {
  id: string; // Assuming prompts will have unique IDs once in Firestore
  title: string;
  prompt: string; // Changed from contentToCopy
  category: string; // Category ID
  tools: string[]; // Changed from aiTools
  isFeatured: boolean;
  description?: string; // Optional: if you want a short description separate from the full prompt
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconEmoji: string; // To store the emoji from JSON
  Icon?: LucideIcon; // Mapped Lucide icon component
}

// This type remains useful for PromptCollectionCard
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

// This was the old CategoryInfo, mapped to new Category type
// export interface CategoryInfo {
//   id: string;
//   title: string;
//   description: string;
//   Icon: LucideIcon;
//   href: string;
// }

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  isCTA?: boolean;
}
