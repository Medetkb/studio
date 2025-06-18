
import type React from 'react';
import type { LucideIcon } from 'lucide-react';
import { z } from 'zod';

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

// Types for the /courses page
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

// Types for the /pricing page
export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceSuffix: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export const PaymentFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  cardNumber: z.string()
    .min(16, { message: "Card number must be 16 digits." })
    .max(19, { message: "Card number must be 16-19 digits." }) // Allowing for spaces
    .regex(/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/, { message: "Invalid card number format." }),
  expiryDate: z.string()
    .min(5, { message: "Expiry date must be MM/YY."})
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Invalid expiry date format (MM/YY)." }),
  cvc: z.string().min(3, { message: "CVC must be 3-4 digits." }).max(4, { message: "CVC must be 3-4 digits." })
    .regex(/^\d{3,4}$/, { message: "Invalid CVC format." }),
  billingAddress: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof PaymentFormSchema>;
