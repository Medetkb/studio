"use client";

import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "./container";

export function UpgradeProSection() {
  return (
    <section id="upgrade-pro-section" className="py-12 md:py-16 animate-fadeIn animation-delay-200 opacity-0">
      <Container>
        <Card className="bg-gradient-to-br from-primary/90 to-primary shadow-xl overflow-hidden">
          <CardContent className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-primary-foreground dark:text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 dark:bg-primary-foreground/20 p-3 rounded-full">
                <Zap className="h-8 w-8 text-white dark:text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-headline font-semibold">Upgrade to PRO</h2>
                <p className="text-md md:text-lg opacity-90">
                  Unlock unlimited copies, custom prompts, and more exclusive features.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 dark:bg-primary-foreground dark:text-primary dark:hover:bg-primary-foreground/90 font-semibold text-lg px-8 py-3 shadow-md transition-transform hover:scale-105"
              aria-label="Upgrade to PRO"
              onClick={() => { alert("Upgrade to PRO clicked!"); }}
            >
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
