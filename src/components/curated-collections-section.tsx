"use client";

import { Container } from "./container";
import { PromptCollectionCard } from "./prompt-collection-card";
import { SearchInput } from "./search-input";
import type { PromptCollection } from "@/types";
import { Lightbulb, Megaphone, Briefcase, Home, Brain, Sparkles, FileText, ShoppingCart, Settings, Users, TrendingUp, Palette } from "lucide-react";

const collectionsData: PromptCollection[] = [
  {
    id: "content",
    name: "Content Creation",
    Icon: Palette, // Changed from Lightbulb for better relevance
    prompts: [
      { id: "p1", title: "Blog Post Ideas", description: "Generate 10 unique blog post ideas for a [topic].", contentToCopy: "Generate 10 unique blog post ideas for a [topic]. Consider current trends and evergreen content.", aiTools: ["ChatGPT", "Claude"] },
      { id: "p2", title: "Video Script Outline", description: "Create a script outline for a 5-minute YouTube video about [subject].", contentToCopy: "Create a script outline for a 5-minute YouTube video about [subject]. Include intro, main points, and call to action.", aiTools: ["Grok"] },
    ],
  },
  {
    id: "marketing",
    name: "Marketing & Sales",
    Icon: Megaphone,
    prompts: [
      { id: "p3", title: "Ad Copy Variants", description: "Write 3 variations of ad copy for a [product/service] targeting [audience].", contentToCopy: "Write 3 variations of ad copy for a [product/service] targeting [audience]. Focus on benefits and a strong CTA.", aiTools: ["ChatGPT", "DeepSeek"] },
      { id: "p4", title: "Email Campaign Subject Lines", description: "Generate 5 catchy subject lines for an email campaign about [promotion].", contentToCopy: "Generate 5 catchy subject lines for an email campaign about [promotion]. Aim for high open rates.", aiTools: ["Claude"] },
    ],
  },
  {
    id: "business",
    name: "Business Operations",
    Icon: Briefcase,
    prompts: [
      { id: "p5", title: "Meeting Agenda", description: "Create a meeting agenda for a 1-hour [meeting_type] meeting.", contentToCopy: "Create a meeting agenda for a 1-hour [meeting_type] meeting. Include objectives, discussion points, and action items.", aiTools: ["ChatGPT"] },
      { id: "p6", title: "SWOT Analysis", description: "Perform a SWOT analysis for a [company/project].", contentToCopy: "Perform a SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) for a [company/project].", aiTools: ["Claude", "Grok"] },
    ],
  },
  {
    id: "everyday-life",
    name: "Everyday Life",
    Icon: Home,
    prompts: [
      { id: "p7", title: "Meal Plan Ideas", description: "Suggest a 7-day healthy meal plan for a [dietary_preference] diet.", contentToCopy: "Suggest a 7-day healthy meal plan for a [dietary_preference] diet. Include breakfast, lunch, and dinner.", aiTools: ["DeepSeek"] },
      { id: "p8", title: "Travel Itinerary", description: "Plan a 3-day travel itinerary for a trip to [city].", contentToCopy: "Plan a 3-day travel itinerary for a trip to [city]. Include key attractions, dining options, and travel tips.", aiTools: ["ChatGPT"] },
    ],
  },
  {
    id: "self-help",
    name: "Psychology & Self-Help",
    Icon: Brain,
    prompts: [
      { id: "p9", title: "Journaling Prompts", description: "Provide 5 journaling prompts for self-reflection on [topic].", contentToCopy: "Provide 5 journaling prompts for self-reflection on [topic, e.g., personal growth, gratitude, stress management].", aiTools: ["Claude"] },
      { id: "p10", title: "Goal Setting Exercise", description: "Guide me through a SMART goal setting exercise for [personal_goal].", contentToCopy: "Guide me through a SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goal setting exercise for [personal_goal].", aiTools: ["ChatGPT", "Grok"] },
    ],
  },
  {
    id: "esoteric",
    name: "Astrology, Tarot & Numerology",
    Icon: Sparkles,
    prompts: [
      { id: "p11", title: "Tarot Card Interpretation", description: "Interpret the meaning of the [tarot_card] in the context of [situation].", contentToCopy: "Interpret the meaning of the [tarot_card] in the context of [situation]. Provide insights and guidance.", aiTools: ["DeepSeek", "Claude"] },
      { id: "p12", title: "Daily Horoscope", description: "Write a daily horoscope for [zodiac_sign] focusing on [aspect_of_life].", contentToCopy: "Write a daily horoscope for [zodiac_sign] focusing on [aspect_of_life, e.g., career, love, wellness].", aiTools: ["ChatGPT"] },
    ],
  },
];


export function CuratedCollectionsSection() {
  return (
    <section className="py-12 md:py-16 animate-fadeIn animation-delay-300 opacity-0">
      <Container>
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4">
            Curated Prompt Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore expertly crafted prompts organized by category to kickstart your creativity and productivity.
          </p>
        </div>
        <div className="mb-10 md:mb-12">
          <SearchInput />
        </div>
        <div className="space-y-10">
          {collectionsData.map((collection, index) => (
            <PromptCollectionCard key={collection.id} collection={collection} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
