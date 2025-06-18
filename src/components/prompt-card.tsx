"use client";

import type React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCopy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Prompt } from "@/types";

interface PromptCardProps {
  prompt: Prompt;
  animationDelay?: string;
}

export function PromptCard({ prompt, animationDelay }: PromptCardProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt) 
      .then(() => {
        toast({
          title: "Copied to clipboard!",
          description: `Prompt "${prompt.title}" copied.`,
        });
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Error copying",
          description: "Could not copy prompt to clipboard.",
          variant: "destructive",
        });
      });
  };

  return (
    <Card
      className="h-full flex flex-col bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-103 animate-fadeIn opacity-0"
      style={{ animationDelay }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{prompt.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {prompt.prompt}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t">
        <div className="flex flex-wrap gap-2">
          {prompt.tools.map((tool) => ( 
            <Badge key={tool} variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/30 dark:text-accent-foreground dark:bg-accent/20">
              {tool}
            </Badge>
          ))}
        </div>
        <Button
          size="sm"
          onClick={handleCopy}
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
          aria-label={`Copy prompt: ${prompt.title}`}
        >
          <ClipboardCopy className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </CardFooter>
    </Card>
  );
}
