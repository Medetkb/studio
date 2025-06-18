import type React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  contentToCopy: string;
  aiTools: string[];
}

export interface PromptCollection {
  id: string;
  name: string;
  Icon?: LucideIcon; // Lucide icon component
  iconAihint?: string; // Optional AI hint for icon if not using Lucide
  prompts: Prompt[];
}

export type Tag = {
  id: string;
  name: string;
};

export interface CategoryInfo {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  href: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  isCTA?: boolean;
}
