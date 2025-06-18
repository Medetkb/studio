"use client";

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PromptCollection } from "@/types";
import { PromptCard } from "./prompt-card";

interface PromptCollectionCardProps {
  collection: PromptCollection;
  index: number;
}

export function PromptCollectionCard({ collection, index }: PromptCollectionCardProps) {
  const IconComponent = collection.Icon;

  return (
    <div className={`animate-fadeIn opacity-0`} style={{ animationDelay: `${index * 150 + 500}ms` }}>
      <CardHeader className="mb-0 pb-2 pt-4 px-4">
        <CardTitle className="text-xl md:text-2xl font-headline font-semibold text-foreground flex items-center gap-3">
          {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
          {collection.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {collection.prompts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {collection.prompts.map((prompt, promptIdx) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                animationDelay={`${index * 150 + 500 + (promptIdx + 1) * 50}ms`} 
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No prompts in this collection yet.</p>
        )}
      </CardContent>
    </div>
  );
}
