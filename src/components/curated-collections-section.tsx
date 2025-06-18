
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Container } from "./container";
import { PromptCollectionCard } from "./prompt-collection-card";
import { PromptCard } from "./prompt-card";
import { SearchInput } from "./search-input";
import { Button } from "@/components/ui/button";
import type { Prompt, Category as AppCategory, PromptCollection } from "@/types";
import { Briefcase, Palette, TrendingUp, ListChecks, Brain, Sparkles, Megaphone } from "lucide-react";
import { cn } from '@/lib/utils';

// In a real app, this data would be fetched from Firestore.
const rawCategoriesData: AppCategory[] = [
  { "id": "marketing", "name": "Marketing & Sales", "description": "Target audience analysis, funnel building, conversion optimization.", iconEmoji: "💼" },
  { "id": "content", "name": "Content & Creativity", "description": "Content ideas, scripts, outlines, formats.", iconEmoji: "✍️" },
  { "id": "business", "name": "Business & Growth", "description": "Planning, automation, systems, team management.", iconEmoji: "📊" },
  { "id": "daily", "name": "Daily Productivity", "description": "Daily routines, task management, focus prompts.", iconEmoji: "📆" },
  { "id": "psychology", "name": "Psychology & Self-help", "description": "Self-reflection, mindset, emotional support.", iconEmoji: "🧠" },
  { "id": "mystic", "name": "Mystic", "description": "Astrology, Tarot, Numerology insights.", iconEmoji: "🔮" }
];

const rawPromptsData: Prompt[] = [
  { "id": "pm1", "title": "Customer Persona Generator", "prompt": "Create a detailed customer persona for a digital marketing agency targeting local businesses.", "category": "marketing", "tools": ["ChatGPT", "Claude"], "isFeatured": true },
  { "id": "pm2", "title": "Ad Copy Generator", "prompt": "Write 3 variations of ad copy for Instagram promoting a skincare product line.", "category": "marketing", "tools": ["ChatGPT"], "isFeatured": false },
  { "id": "pm3", "title": "SEO Keyword Strategy", "prompt": "Develop a list of 10 long-tail keywords for a new blog about sustainable fashion.", "category": "marketing", "tools": ["ChatGPT", "Grok"], "isFeatured": false },
  { "id": "pc1", "title": "YouTube Script Template", "prompt": "Create a script for a 5-minute educational video about AI tools for content creators.", "category": "content", "tools": ["ChatGPT", "DeepSeek"], "isFeatured": true },
  { "id": "pc2", "title": "30-Day Content Plan", "prompt": "Generate a 30-day content calendar for a lifestyle influencer on Instagram.", "category": "content", "tools": ["Claude", "Grok"], "isFeatured": false },
  { "id": "pc3", "title": "Podcast Episode Outline", "prompt": "Create a detailed outline for a 30-minute podcast episode discussing the future of remote work.", "category": "content", "tools": ["Claude"], "isFeatured": false },
  { "id": "pb1", "title": "Business Growth Plan", "prompt": "Outline a 3-month growth strategy for a SaaS startup with under $10k MRR.", "category": "business", "tools": ["ChatGPT", "Claude", "Grok"], "isFeatured": true },
  { "id": "pb2", "title": "Automation Audit", "prompt": "Identify and list 5 business processes that could be automated in a solopreneur business.", "category": "business", "tools": ["ChatGPT"], "isFeatured": false },
  { "id": "pb3", "title": "Competitor Analysis Prompt", "prompt": "Provide a framework for analyzing the top 3 competitors of an e-commerce store selling handmade jewelry.", "category": "business", "tools": ["ChatGPT"], "isFeatured": false },
  { "id": "pd1", "title": "Morning Routine Optimizer", "prompt": "Design a 30-minute productivity-focused morning routine for a remote worker.", "category": "daily", "tools": ["Claude"], "isFeatured": false },
  { "id": "pd2", "title": "Time Blocking Assistant", "prompt": "Help me organize my week into 3-hour work blocks using time blocking.", "category": "daily", "tools": ["Grok", "ChatGPT"], "isFeatured": false },
  { "id": "pd3", "title": "Weekly Goal Setting", "prompt": "Help me set 3 achievable goals for the upcoming week, focusing on work-life balance.", "category": "daily", "tools": ["DeepSeek", "Claude"], "isFeatured": false },
  { "id": "pps1", "title": "Self-Reflection Prompt", "prompt": "Guide me through a deep self-reflection exercise on fear of failure.", "category": "psychology", "tools": ["Claude", "ChatGPT"], "isFeatured": true },
  { "id": "pps2", "title": "Overthinking Relief", "prompt": "Give me 5 journal prompts to help reduce overthinking before sleep.", "category": "psychology", "tools": ["ChatGPT"], "isFeatured": false },
  { "id": "pps3", "title": "Gratitude Journal Prompts", "prompt": "Generate 5 unique gratitude journal prompts to encourage daily reflection.", "category": "psychology", "tools": ["ChatGPT"], "isFeatured": false },
  { "id": "pmys1", "title": "Daily Tarot Spread", "prompt": "Generate a 3-card daily tarot reading with interpretation and advice.", "category": "mystic", "tools": ["ChatGPT", "Grok"], "isFeatured": false },
  { "id": "pmys2", "title": "Numerology Report", "prompt": "Create a personal numerology report based on my full birth name and date of birth.", "category": "mystic", "tools": ["Claude"], "isFeatured": true },
  { "id": "pmys4", "title": "Moon Phase Ritual Idea", "prompt": "Suggest a simple ritual for the next full moon to release negative energy.", "category": "mystic", "tools": ["Grok"], "isFeatured": false }
];

const getIconForCategory = (categoryId: string) => {
  switch (categoryId) {
    case "marketing": return Briefcase;
    case "content": return Palette;
    case "business": return TrendingUp;
    case "daily": return ListChecks;
    case "psychology": return Brain;
    case "mystic": return Sparkles;
    default: return Megaphone; 
  }
};

const categoriesWithIcons: AppCategory[] = rawCategoriesData.map(category => ({
  ...category,
  Icon: getIconForCategory(category.id),
}));

export function CuratedCollectionsSection() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(categoriesWithIcons[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(searchTerm.trim() !== '');
  }, [searchTerm]);

  const displayedPrompts = useMemo(() => {
    let prompts = rawPromptsData;
    if (isSearching) {
      // Search across all categories
      prompts = prompts.filter(prompt =>
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeCategoryId) {
      // Filter by active category if not searching
      prompts = prompts.filter(prompt => prompt.category === activeCategoryId);
    } else {
        // If no category is active and not searching (e.g. initial state if activeCategoryId was null)
        prompts = [];
    }
    return prompts;
  }, [searchTerm, activeCategoryId, isSearching]);

  const activeCollection: PromptCollection | undefined = useMemo(() => {
    if (!isSearching && activeCategoryId) {
      const category = categoriesWithIcons.find(cat => cat.id === activeCategoryId);
      if (category) {
        return {
          id: category.id,
          name: category.name,
          Icon: category.Icon,
          prompts: displayedPrompts, // These are already filtered for the active category
        };
      }
    }
    return undefined;
  }, [activeCategoryId, displayedPrompts, isSearching]);

  return (
    <section className="py-12 md:py-16 animate-fadeIn animation-delay-300 opacity-0">
      <Container>
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4">
            Curated Prompt Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore expertly crafted prompts. Select a category or search by keyword.
          </p>
        </div>

        <div id="curated-collections-search-section" className="mb-8 md:mb-10">
          <SearchInput 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search all prompts by keyword..."
          />
        </div>

        <div className="mb-8 md:mb-10 flex flex-wrap justify-center gap-2 md:gap-3">
          {categoriesWithIcons.map((category, index) => (
            <Button
              key={category.id}
              variant={activeCategoryId === category.id && !isSearching ? "default" : "outline"}
              onClick={() => {
                setActiveCategoryId(category.id);
                // Optionally clear search when a category is clicked
                // setSearchTerm(''); 
              }}
              className={cn(
                "transition-all duration-200 ease-in-out animate-fadeIn opacity-0",
                activeCategoryId === category.id && !isSearching 
                  ? "bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90" 
                  : "text-foreground/80 border-border hover:bg-accent/10 hover:text-primary dark:hover:bg-accent/20 dark:hover:text-primary",
                "rounded-md px-4 py-2 text-sm md:text-base" 
              )}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              {category.Icon && <category.Icon className="mr-2 h-4 w-4" />}
              {category.name}
            </Button>
          ))}
        </div>
        
        <div className="mt-8 min-h-[300px]"> {/* Added min-height for smoother transitions */}
          {isSearching ? (
            // Search Results View
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center text-foreground animate-fadeIn opacity-0" style={{animationDelay: '100ms'}}>
                Search Results for "{searchTerm}"
              </h3>
              {displayedPrompts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                  {displayedPrompts.map((prompt, index) => (
                    <PromptCard 
                      key={prompt.id || index} 
                      prompt={prompt} 
                      animationDelay={`${index * 100 + 200}ms`}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8 animate-fadeIn opacity-0" style={{animationDelay: '200ms'}}>
                  No prompts found matching your search term.
                </p>
              )}
            </div>
          ) : activeCollection ? (
            // Category Accordion View
            <div 
              key={activeCollection.id} // Ensures re-render on category change for animation
              className="animate-fadeIn" 
            >
              <PromptCollectionCard collection={activeCollection} index={0} />
            </div>
          ) : (
             <p className="text-center text-muted-foreground py-8 animate-fadeIn opacity-0" style={{animationDelay: '200ms'}}>
               Select a category to view prompts.
             </p>
          )}
        </div>
      </Container>
    </section>
  );
}

