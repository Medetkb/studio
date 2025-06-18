
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
  author?: string; // Optional author field
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconEmoji: string; // Kept for reference if raw data uses it
  Icon?: LucideIcon; // For UI rendering
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
  id:string;
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
    .max(19, { message: "Card number must be 16-19 digits." }) 
    .regex(/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/, { message: "Invalid card number format." }),
  expiryDate: z.string()
    .min(5, { message: "Expiry date must be MM/YY."})
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Invalid expiry date format (MM/YY)." }),
  cvc: z.string().min(3, { message: "CVC must be 3-4 digits." }).max(4, { message: "CVC must be 3-4 digits." })
    .regex(/^\d{3,4}$/, { message: "Invalid CVC format." }),
  billingAddress: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof PaymentFormSchema>;

// Auth Schemas
export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});
export type LoginFormData = z.infer<typeof LoginSchema>;

export const SignUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], 
});
export type SignUpFormData = z.infer<typeof SignUpSchema>;

export const PasswordResetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});
export type PasswordResetFormData = z.infer<typeof PasswordResetSchema>;

// Workspace Schemas
export const PromptFormSchema = z.object({
  id: z.string().optional(), // Optional for new prompts
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  prompt: z.string().min(10, { message: "Prompt content must be at least 10 characters." }),
  category: z.string().min(1, { message: "Category is required." }),
  tools: z.array(z.string()).optional().default([]), // Default to empty array
  isFeatured: z.boolean().optional().default(false), // Default to false
  author: z.string().optional(),
});
export type PromptFormData = z.infer<typeof PromptFormSchema>;

    