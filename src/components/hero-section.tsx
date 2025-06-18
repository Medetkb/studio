
"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { ArrowRight } from "lucide-react";

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
        <div className="mt-10">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3 shadow-lg transition-transform hover:scale-105 animate-fadeIn opacity-0"
            style={{animationDelay: '200ms'}}
            asChild
          >
            <Link href="/promo">
              Start Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
