
"use client";

import { Container } from "./container";
import { PromptCard } from "./prompt-card";
import type { Prompt } from "@/types";
import { Star } from "lucide-react";

// In a real app, this data would be fetched from Firestore.
// Using user-provided data
const rawPromptsData: Prompt[] = [
  { "id": "pm1", "title": "Customer Persona Generator", "prompt": "Create a detailed customer persona for a digital marketing agency targeting local businesses.", "category": "marketing", "tools": ["ChatGPT", "Claude"], "isFeatured": true },
  { "id": "pc1", "title": "YouTube Script Template", "prompt": "Create a script for a 5-minute educational video about AI tools for content creators.", "category": "content", "tools": ["ChatGPT", "DeepSeek"], "isFeatured": true },
  { "id": "pb1", "title": "Business Growth Plan", "prompt": "Outline a 3-month growth strategy for a SaaS startup with under $10k MRR.", "category": "business", "tools": ["ChatGPT", "Claude", "Grok"], "isFeatured": true },
  { "id": "pps1", "title": "Self-Reflection Prompt", "prompt": "Guide me through a deep self-reflection exercise on fear of failure.", "category": "psychology", "tools": ["Claude", "ChatGPT"], "isFeatured": true },
  { "id": "pmys2", "title": "Numerology Report", "prompt": "Create a personal numerology report based on my full birth name and date of birth.", "category": "mystic", "tools": ["Claude"], "isFeatured": true },
  // Non-featured prompts are included in rawPromptsData but filtered out below.
  { "id": "pm2", "title": "Ad Copy Generator", "prompt": "Write 3 variations of ad copy for Instagram promoting a skincare product line.", "category": "marketing", "tools": ["ChatGPT"], "isFeatured": false },
  { "id": "pc2", "title": "30-Day Content Plan", "prompt": "Generate a 30-day content calendar for a lifestyle influencer on Instagram.", "category": "content", "tools": ["Claude", "Grok"], "isFeatured": false },
  { "id": "pb2", "title": "Automation Audit", "prompt": "Identify and list 5 business processes that could be automated in a solopreneur business.", "category": "business", "tools": ["ChatGPT"], "isFeatured": false },
  { "id": "pd1", "title": "Morning Routine Optimizer", "prompt": "Design a 30-minute productivity-focused morning routine for a remote worker.", "category": "daily", "tools": ["Claude"], "isFeatured": false },
  { "id": "pd2", "title": "Time Blocking Assistant", "prompt": "Help me organize my week into 3-hour work blocks using time blocking.", "category": "daily", "tools": ["Grok", "ChatGPT"], "isFeatured": false },
  { "id": "pps2", "title": "Overthinking Relief", "prompt": "Give me 5 journal prompts to help reduce overthinking before sleep.", "category": "psychology", "tools": ["ChatGPT"], "isFeatured": false },
  { "id": "pmys1", "title": "Daily Tarot Spread", "prompt": "Generate a 3-card daily tarot reading with interpretation and advice.", "category": "mystic", "tools": ["ChatGPT", "Grok"], "isFeatured": false }
];


const featuredPrompts: Prompt[] = rawPromptsData.filter(prompt => prompt.isFeatured);

export function FeaturedPromptsSection() {
  if (featuredPrompts.length === 0) {
    return null; 
  }

  return (
    <section className="py-12 md:py-16 bg-background/70 animate-fadeIn animation-delay-300 opacity-0">
      <Container>
        <div className="mb-10 md:mb-12 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Star className="h-8 w-8 text-primary" />
            Featured Prompts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Handpicked prompts to get you started quickly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {featuredPrompts.map((prompt, index) => (
            <PromptCard 
              key={prompt.id || prompt.title} 
              prompt={prompt} 
              animationDelay={`${index * 100 + 400}ms`} 
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
