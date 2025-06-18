
"use client";

import { Button } from "@/components/ui/button";
import { Container } from "./container";
import type { Tag } from "@/types";

const tags: Tag[] = [
  { id: "idea-generation", name: "Idea generation" },
  { id: "work-assistance", name: "Work assistance" },
  { id: "saves-time", name: "Saves time" },
  { id: "interactivity", name: "Interactivity" },
  { id: "boosts-productivity", name: "Boosts productivity" },
];

export function TagButtonsSection() {
  return (
    <section className="py-8 md:py-12 animate-fadeIn animation-delay-100 opacity-0">
      <Container className="flex flex-wrap justify-center gap-3 md:gap-4">
        {tags.map((tag, index) => (
          <Button
            key={tag.id}
            variant="outline"
            size="lg"
            className="rounded-full text-sm md:text-base border-primary/50 hover:bg-primary/10 hover:border-primary text-primary bg-card hover:text-primary focus:bg-primary/10 focus:text-primary focus:ring-2 focus:ring-primary/50 transition-all duration-200 ease-in-out shadow-sm animate-fadeIn opacity-0"
            style={{ animationDelay: `${index * 100 + 200}ms` }}
          >
            {tag.name}
          </Button>
        ))}
      </Container>
    </section>
  );
}
