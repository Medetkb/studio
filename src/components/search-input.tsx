"use client";

import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import type React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder || "Search prompts by keyword, category or AI tool..."}
        className="pl-10 pr-4 py-3 text-base rounded-full shadow-sm border-border focus:ring-primary focus:border-primary transition-all"
        aria-label="Search prompts"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
