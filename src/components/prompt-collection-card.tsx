
"use client";

import type React from 'react';
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Card is not used directly here
import type { PromptCollection } from "@/types"; 
import { PromptCard } from "./prompt-card";

interface PromptCollectionCardProps {
  collection: PromptCollection;
  index: number; 
}

export function PromptCollectionCard({ collection, index }: PromptCollectionCardProps) {
  const IconComponent = collection.Icon;
  // Animation delay for the collection card itself
  const collectionAnimationDelay = `${index * 150 + 100}ms`; 

  return (
    <div
      className="animate-fadeIn opacity-0" // Overall container animation
      style={{ animationDelay: collectionAnimationDelay }}
    >
      <CardHeader className="mb-0 pb-4 pt-4 px-0"> 
        <CardTitle className="text-xl md:text-2xl font-headline font-semibold text-foreground flex items-center gap-3">
          {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
          {collection.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0"> 
        {collection.prompts && collection.prompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {collection.prompts.map((prompt, promptIdx) => (
              <PromptCard
                key={prompt.id || prompt.title} 
                prompt={prompt}
                // Stagger animation for prompt cards within the collection
                animationDelay={`${100 + (promptIdx + 1) * 100}ms`}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm py-4 text-center animate-fadeIn opacity-0" style={{animationDelay: '200ms'}}>
            No prompts found in this collection.
          </p>
        )}
      </CardContent>
    </div>
  );
}
