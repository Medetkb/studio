"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Category } from "@/types"; 

interface CategoryCardProps {
  category: Category;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const IconComponent = category.Icon; 

  return (
    <div className="block group h-full">
      <Card
        className="h-full bg-card text-card-foreground shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-103 animate-fadeIn opacity-0"
        style={{ animationDelay: `${index * 100 + 300}ms` }}
      >
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
          {IconComponent && (
            <div className="bg-primary/10 p-3 rounded-lg">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
          )}
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {category.name}
          </CardTitle>
        </CardHeader>
        <CardDescription className="px-6 pb-6 text-sm text-muted-foreground">
          {category.description}
        </CardDescription>
      </Card>
    </div>
  );
}
