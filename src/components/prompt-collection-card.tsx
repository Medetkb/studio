
"use client";

import type React from 'react';
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { PromptCollection, Prompt } from "@/types"; // Added Prompt
import { PromptCard } from "./prompt-card";

interface PromptCollectionCardProps {
  collection: PromptCollection; // This now represents a category with its prompts
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
      <CardHeader className="mb-0 pb-2 pt-4 px-0"> {/* Adjusted padding to match spec */}
        <CardTitle className="text-xl md:text-2xl font-headline font-semibold text-foreground flex items-center gap-3">
          {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
          {collection.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0"> {/* Adjusted padding to match spec */}
        {collection.prompts && collection.prompts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4"> {/* md:grid-cols-2 if you want two columns on medium screens */}
            {collection.prompts.map((prompt, promptIdx) => (
              <PromptCard
                key={prompt.id || prompt.title} // Use prompt.id, fallback to title if id not present for some reason
                prompt={prompt}
                animationDelay={`${baseDelay + (promptIdx + 1) * 100}ms`}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm py-4">No prompts found for this collection or filter.</p>
        )}
      </CardContent>
    </div>
  );
}
