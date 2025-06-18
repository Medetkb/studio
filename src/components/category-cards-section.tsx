"use client";

import { Container } from "./container";
import { CategoryCard } from "./category-card";
import type { Category } from "@/types";
import { Briefcase, Palette, TrendingUp, ListChecks, Brain, Sparkles, Megaphone } from "lucide-react";

// In a real app, this data would be fetched from Firestore.
const rawCategoriesData = [
  {
    "id": "marketing",
    "name": "Marketing & Sales",
    "description": "Target audience analysis, funnel building, conversion optimization.",
    "iconEmoji": "💼" 
  },
  {
    "id": "content",
    "name": "Content & Creativity",
    "description": "Content ideas, scripts, outlines, formats.",
    "iconEmoji": "✍️"
  },
  {
    "id": "business",
    "name": "Business & Growth",
    "description": "Planning, automation, systems, team management.",
    "iconEmoji": "📊"
  },
  {
    "id": "daily",
    "name": "Daily Productivity",
    "description": "Daily routines, task management, focus prompts.",
    "iconEmoji": "📆"
  },
  {
    "id": "psychology",
    "name": "Psychology & Self-help",
    "description": "Self-reflection, mindset, emotional support.",
    "iconEmoji": "🧠"
  },
  {
    "id": "mystic",
    "name": "Mystic", // Updated name
    "description": "Astrology, Tarot, Numerology insights.", // Updated description
    "iconEmoji": "🔮"
  }
];

// Helper function to map emoji or ID to Lucide Icon
const getIconForCategory = (categoryId: string) => {
  switch (categoryId) {
    case "marketing": return Briefcase;
    case "content": return Palette; 
    case "business": return TrendingUp;
    case "daily": return ListChecks; 
    case "psychology": return Brain; 
    case "mystic": return Sparkles; 
    default: return Megaphone; // Fallback icon
  }
};

const categoriesData: Category[] = rawCategoriesData.map(category => ({
  ...category,
  Icon: getIconForCategory(category.id),
}));


export function CategoryCardsSection() {
  return (
    <section id="categories-section" className="py-12 md:py-16 bg-background animate-fadeIn animation-delay-200 opacity-0">
      <Container>
        <div className="mb-10 md:mb-12 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-3">
            Explore Prompt Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Dive into specialized collections of prompts designed for your specific needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {categoriesData.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
