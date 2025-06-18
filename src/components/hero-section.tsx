"use client";

import { Container } from "./container";

export function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-background animate-fadeIn opacity-0" style={{animationDelay: '0ms'}}>
      <Container className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
          Prompt Library for ChatGPT, Claude, Grok, DeepSeek and more
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Categories, ready-made templates, and curated collections to supercharge your AI interactions.
        </p>
      </Container>
    </section>
  );
}
