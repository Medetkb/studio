
"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { CategoryInfo } from "@/types";

interface CategoryCardProps {
  category: CategoryInfo;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const IconComponent = category.Icon;
  return (
    <Link href={category.href} className="block group">
      <Card 
        className="h-full bg-card text-card-foreground shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fadeIn opacity-0"
        style={{ animationDelay: `${index * 100 + 300}ms` }}
      >
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {category.title}
          </CardTitle>
        </CardHeader>
        <CardDescription className="px-6 pb-6 text-sm text-muted-foreground">
          {category.description}
        </CardDescription>
      </Card>
    </Link>
  );
}
