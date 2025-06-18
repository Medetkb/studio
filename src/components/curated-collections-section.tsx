
"use client";

import React, { useState, useMemo } from 'react';
import { Container } from "./container";
import { PromptCollectionCard } from "./prompt-collection-card";
import { SearchInput } from "./search-input";
import type { Prompt, Category as AppCategory, PromptCollection } from "@/types"; // Renamed Category to AppCategory to avoid conflict
import { Briefcase, Palette, TrendingUp, ListChecks, Brain, Sparkles, Megaphone } from "lucide-react"; // Import necessary icons

// In a real app, this data would be fetched from Firestore.
// Using user-provided data
const rawCategoriesData: AppCategory[] = [
  { "id": "marketing", "name": "Marketing & Sales", "description": "Target audience analysis, funnel creation, keyword research, sales strategy prompts.", "iconEmoji": "💼" },
  { "id": "content", "name": "Content & Creativity", "description": "Generate content ideas, scripts, outlines, and formats for social media, blogs, and YouTube.", "iconEmoji": "✍️" },
  { "id": "business", "name": "Business & Growth", "description": "Prompts for planning, systemization, automation, finance, and team management.", "iconEmoji": "📊" },
  { "id": "daily", "name": "Daily Productivity", "description": "Prompts to organize your day, build habits, manage tasks, and boost focus.", "iconEmoji": "📆" },
  { "id": "psychology", "name": "Psychology & Self-help", "description": "Prompts for self-reflection, emotional intelligence, inner work, and mindset.", "iconEmoji": "🧠" },
  { "id": "mystic", "name": "Astrology, Tarot & Numerology", "description": "Mystic-themed prompts for daily readings, birth charts, and spiritual guidance.", "iconEmoji": "🔮" }
];

const rawPromptsData: Prompt[] = [
  { "id": "pm1", "title": "Customer Persona Generator", "prompt": "Create a detailed customer persona for a digital marketing agency targeting local businesses.", "category": "marketing", "tools": ["ChatGPT", "Claude"], "isFeatured": true },
  { "id": "pm2", "title": "Ad Copy Generator", "prompt": "Write 3 variations of ad copy for Instagram promoting a skincare product line.", "category": "marketing", "tools": ["ChatGPT"], "isFeatured": false },
  { "id": "pc1", "title": "YouTube Script Template", "prompt": "Create a script for a 5-minute educational video about AI tools for content creators.", "category": "content", "tools": ["ChatGPT", "DeepSeek"], "isFeatured": true },
  { "id": "pc2", "title": "30-Day Content Plan", "prompt": "Generate a 30-day content calendar for a lifestyle influencer on Instagram.", "category": "content", "tools": ["Claude", "Grok"], "isFeatured": false },
  { "id": "pb1", "title": "Business Growth Plan", "prompt": "Outline a 3-month growth strategy for a SaaS startup with under $10k MRR.", "category": "business", "tools": ["ChatGPT", "Claude", "Grok"], "isFeatured": true },
  { "id": "pb2", "title": "Automation Audit", "prompt": "Identify and list 5 business processes that could be automated in a solopreneur business.", "category": "business", "tools": ["ChatGPT"], "isFeatured": false },
  { "id": "pd1", "title": "Morning Routine Optimizer", "prompt": "Design a 30-minute productivity-focused morning routine for a remote worker.", "category": "daily", "tools": ["Claude"], "isFeatured": false },
  { "id": "pd2", "title": "Time Blocking Assistant", "prompt": "Help me organize my week into 3-hour work blocks using time blocking.", "category": "daily", "tools": ["Grok", "ChatGPT"], "isFeatured": false },
  { "id": "pps1", "title": "Self-Reflection Prompt", "prompt": "Guide me through a deep self-reflection exercise on fear of failure.", "category": "psychology", "tools": ["Claude", "ChatGPT"], "isFeatured": true },
  { "id": "pps2", "title": "Overthinking Relief", "prompt": "Give me 5 journal prompts to help reduce overthinking before sleep.", "category": "psychology", "tools": ["ChatGPT"], "isFeatured": false },
  { "id": "pmys1", "title": "Daily Tarot Spread", "prompt": "Generate a 3-card daily tarot reading with interpretation and advice.", "category": "mystic", "tools": ["ChatGPT", "Grok"], "isFeatured": false },
  { "id": "pmys2", "title": "Numerology Report", "prompt": "Create a personal numerology report based on my full birth name and date of birth.", "category": "mystic", "tools": ["Claude"], "isFeatured": true }
];

const getIconForCategory = (categoryId: string) => {
  switch (categoryId) {
    case "marketing": return Briefcase;
    case "content": return Palette;
    case "business": return TrendingUp;
    case "daily": return ListChecks;
    case "psychology": return Brain;
    case "mystic": return Sparkles;
    default: return Megaphone; // Fallback
  }
};

export function CuratedCollectionsSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const collectionsData: PromptCollection[] = useMemo(() => {
    return rawCategoriesData.map(category => {
      let FiltedCategoryPrompts = rawPromptsData.filter(prompt => prompt.category === category.id);

      if (searchTerm) {
        FiltedCategoryPrompts = FiltedCategoryPrompts.filter(prompt =>
          prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      return {
        id: category.id,
        name: category.name,
        Icon: getIconForCategory(category.id),
        prompts: FiltedCategoryPrompts,
      };
    }).filter(collection => collection.prompts.length > 0 || !searchTerm); // Show collection if it has prompts or if no search term
  }, [searchTerm]);

  return (
    <section className="py-12 md:py-16 animate-fadeIn animation-delay-300 opacity-0">
      <Container>
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4">
            Curated Prompt Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore expertly crafted prompts organized by category. Search by keyword to find what you need.
          </p>
        </div>
        <div className="mb-10 md:mb-12">
          <SearchInput 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {collectionsData.length > 0 ? (
          <div className="space-y-10">
            {collectionsData.map((collection, index) => (
              <PromptCollectionCard key={collection.id} collection={collection} index={index} />
            ))}
          </div>
        ) : (
           <p className="text-center text-muted-foreground text-lg">
            No prompts match your search criteria. Try a different keyword.
          </p>
        )}
      </Container>
    </section>
  );
}
