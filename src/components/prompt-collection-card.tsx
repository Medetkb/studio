
"use client";

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Card import might be redundant if not used directly for styling outer shell
import type { PromptCollection } from "@/types";
import { PromptCard } from "./prompt-card";

interface PromptCollectionCardProps {
  collection: PromptCollection;
  index: number; // Overall index of the collection for base animation delay
}

export function PromptCollectionCard({ collection, index }: PromptCollectionCardProps) {
  const IconComponent = collection.Icon;
  const baseDelay = index * 150 + 500; // Base delay for the collection card itself

  return (
    <div 
      className="animate-fadeIn opacity-0" 
      style={{ animationDelay: `${baseDelay}ms` }}
    >
      <CardHeader className="mb-0 pb-2 pt-4 px-4 md:px-0"> {/* Adjusted padding for potentially wider layout */}
        <CardTitle className="text-xl md:text-2xl font-headline font-semibold text-foreground flex items-center gap-3">
          {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
          {collection.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-0"> {/* Adjusted padding */}
        {collection.prompts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4"> {/* Simplified to single column for clarity, can be md:grid-cols-2 if needed */}
            {collection.prompts.map((prompt, promptIdx) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                animationDelay={`${baseDelay + (promptIdx + 1) * 100}ms`} // Staggered delay for prompts within the collection
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
