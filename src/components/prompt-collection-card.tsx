
"use client";

import type React from 'react';
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { PromptCollection } from "@/types"; 
import { PromptCard } from "./prompt-card";

interface PromptCollectionCardProps {
  collection: PromptCollection;
  index: number; 
}

export function PromptCollectionCard({ collection, index }: PromptCollectionCardProps) {
  const IconComponent = collection.Icon;
  const baseDelay = index * 150 + 500; 

  return (
    <div
      className="animate-fadeIn opacity-0"
      style={{ animationDelay: `${baseDelay}ms` }}
    >
      <CardHeader className="mb-0 pb-2 pt-4 px-0"> 
        <CardTitle className="text-xl md:text-2xl font-headline font-semibold text-foreground flex items-center gap-3">
          {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
          {collection.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0"> 
        {collection.prompts && collection.prompts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1"> {/* Adjusted for single column layout within collection on larger screens if preferred, else md:grid-cols-2 */}
            {collection.prompts.map((prompt, promptIdx) => (
              <PromptCard
                key={prompt.id || prompt.title} 
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
