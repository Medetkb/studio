
"use client";

import Link from "next/link"; // Link might not be used if not navigating directly
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Category } from "@/types"; // Updated type

interface CategoryCardProps {
  category: Category;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const IconComponent = category.Icon; // Assumes Icon is now populated with LucideIcon

  // If you want clicking category cards to filter content on the page,
  // you might replace Link with a button or div and an onClick handler.
  // For now, it's a static display card.
  return (
    // <Link href={`#${category.id}`} className="block group"> // href might change based on filtering strategy
    <div className="block group h-full">
      <Card
        className="h-full bg-card text-card-foreground shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fadeIn opacity-0"
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
    // </Link>
  );
}
