
"use client";

import { Container } from "./container";
import { CategoryCard } from "./category-card";
import type { CategoryInfo } from "@/types";
import { Megaphone, Palette, Briefcase, ListChecks, Brain } from "lucide-react";

const categoriesData: CategoryInfo[] = [
  {
    id: "marketing-sales",
    title: "Marketing & Sales",
    description: "Target audience analysis, funnel creation, keyword selection, and conversion improvement.",
    Icon: Megaphone,
    href: "#marketing-sales",
  },
  {
    id: "content-creativity",
    title: "Content & Creativity",
    description: "Generate ideas, post scripts, video concepts, and content planning prompts.",
    Icon: Palette,
    href: "#content-creativity",
  },
  {
    id: "business-growth",
    title: "Business & Growth",
    description: "Planning, systematization, automation, finance, and team management.",
    Icon: Briefcase,
    href: "#business-growth",
  },
  {
    id: "daily-productivity",
    title: "Daily Productivity",
    description: "Tasks, to-do lists, routines, and personal productivity prompts.",
    Icon: ListChecks,
    href: "#daily-productivity",
  },
  {
    id: "psychology-self-help",
    title: "Psychology & Self-help",
    description: "Mental health, self-reflection, emotional support, and personal development prompts.",
    Icon: Brain,
    href: "#psychology-self-help",
  },
];

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
