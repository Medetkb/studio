
"use client";

import { Container } from "./container";
import { CategoryCard } from "./category-card";
import type { Category } from "@/types";
import { Megaphone, Palette, Briefcase, ListChecks, Brain, Sparkles, TrendingUp, CalendarClock, HeartHandshake, Wand2, FileText, BarChartBig } from "lucide-react"; // Added more icons for mapping

// Data provided by user
const rawCategoriesData = [
  {
    "id": "marketing",
    "name": "Marketing & Sales",
    "description": "Target audience analysis, funnel creation, keyword research, sales strategy prompts.",
    "iconEmoji": "💼"
  },
  {
    "id": "content",
    "name": "Content & Creativity",
    "description": "Generate content ideas, scripts, outlines, and formats for social media, blogs, and YouTube.",
    "iconEmoji": "✍️"
  },
  {
    "id": "business",
    "name": "Business & Growth",
    "description": "Prompts for planning, systemization, automation, finance, and team management.",
    "iconEmoji": "📊"
  },
  {
    "id": "daily",
    "name": "Daily Productivity",
    "description": "Prompts to organize your day, build habits, manage tasks, and boost focus.",
    "iconEmoji": "📆"
  },
  {
    "id": "psychology",
    "name": "Psychology & Self-help",
    "description": "Prompts for self-reflection, emotional intelligence, inner work, and mindset.",
    "iconEmoji": "🧠"
  },
  {
    "id": "mystic",
    "name": "Astrology, Tarot & Numerology",
    "description": "Mystic-themed prompts for daily readings, birth charts, and spiritual guidance.",
    "iconEmoji": "🔮"
  }
];

// Helper function to map emoji or ID to Lucide Icon
const getIconForCategory = (categoryId: string, iconEmoji: string) => {
  switch (categoryId) {
    case "marketing": return Briefcase; // Was Megaphone, Briefcase fits 💼 better
    case "content": return Palette; // Palette fits ✍️
    case "business": return TrendingUp; // TrendingUp fits 📊
    case "daily": return ListChecks; // ListChecks fits 📆
    case "psychology": return Brain; // Brain fits 🧠
    case "mystic": return Sparkles; // Sparkles fits 🔮
    default: return Megaphone; // Fallback icon
  }
};

const categoriesData: Category[] = rawCategoriesData.map(category => ({
  ...category,
  Icon: getIconForCategory(category.id, category.iconEmoji),
}));

// In a real app, categoriesData would be fetched from Firestore.

export function CategoryCardsSection() {
  return (
    <section className="py-12 md:py-16 bg-background animate-fadeIn animation-delay-200 opacity-0">
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
