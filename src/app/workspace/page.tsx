
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { PromptFormModal } from '@/components/workspace/prompt-form-modal';
import type { Prompt, Category as AppCategory, PromptFormData } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Home, PlusCircle, Search, Edit3, Trash2, ChevronDown, ChevronUp, Filter, Briefcase, Palette, TrendingUp, ListChecks, Brain, Sparkles, Megaphone, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';


// Mock Data (In a real app, this would come from a backend/Firebase)
const initialCategoriesData: AppCategory[] = [
  { id: "marketing", name: "Marketing & Sales", description: "Prompts for marketing strategies.", iconEmoji: "💼", Icon: Briefcase },
  { id: "content", name: "Content & Creativity", description: "Prompts for creative content generation.", iconEmoji: "✍️", Icon: Palette },
  { id: "business", name: "Business & Growth", description: "Prompts for business development.", iconEmoji: "📊", Icon: TrendingUp },
  { id: "daily", name: "Daily Productivity", description: "Prompts for daily tasks and productivity.", iconEmoji: "📆", Icon: ListChecks },
  { id: "psychology", name: "Psychology & Self-help", description: "Prompts for psychological insights.", iconEmoji: "🧠", Icon: Brain },
  { id: "mystic", name: "Mystic", description: "Prompts for mystical explorations.", iconEmoji: "🔮", Icon: Sparkles }
];

const initialPromptsData: Prompt[] = [
  { id: "pm1", title: "Customer Persona Generator", prompt: "Create a detailed customer persona...", category: "marketing", tools: ["ChatGPT"], isFeatured: true, author: "Admin" },
  { id: "pc1", title: "YouTube Script Template", prompt: "Outline a script for a YouTube video...", category: "content", tools: ["Claude"], isFeatured: true, author: "Admin" },
  { id: "pb1", title: "Business Growth Plan", prompt: "Develop a 3-month growth plan for a startup...", category: "business", tools: ["Grok"], isFeatured: false, author: "Jane Doe" },
  { id: "pm2", title: "Email Marketing Campaign", prompt: "Draft a 5-email sequence for a new product launch.", category: "marketing", tools: ["ChatGPT", "Claude"], isFeatured: false, author: "Admin"},
  { id: "pd1", title: "Morning Focus Routine", prompt: "Design a 30-minute morning routine to maximize focus for a software developer.", category: "daily", tools: ["ChatGPT"], isFeatured: false, author: "Jane Doe"},
];

export default function WorkspacePage() {
  const { toast } = useToast();
  const [prompts, setPrompts] = useState<Prompt[]>(initialPromptsData);
  const [categories, setCategories] = useState<AppCategory[]>(initialCategoriesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<PromptFormData | null>(null);
  const [promptToDelete, setPromptToDelete] = useState<Prompt | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Pre-expand all categories
    const allExpanded: Record<string, boolean> = {};
    categories.forEach(cat => allExpanded[cat.id] = true);
    setExpandedCategories(allExpanded);
  }, [categories]);


  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter ? prompt.category === categoryFilter : true;
      return matchesSearch && matchesCategory;
    });
  }, [prompts, searchTerm, categoryFilter]);

  const groupedPrompts = useMemo(() => {
    const groups: Record<string, Prompt[]> = {};
    filteredPrompts.forEach(prompt => {
      if (!groups[prompt.category]) {
        groups[prompt.category] = [];
      }
      groups[prompt.category].push(prompt);
    });
    return groups;
  }, [filteredPrompts]);

  const handleCreatePrompt = () => {
    setEditingPrompt(null);
    setIsModalOpen(true);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    const promptFormData: PromptFormData = {
        id: prompt.id,
        title: prompt.title,
        prompt: prompt.prompt,
        category: prompt.category,
        tools: prompt.tools || [],
        isFeatured: prompt.isFeatured || false,
        author: prompt.author || ''
    }
    setEditingPrompt(promptFormData);
    setIsModalOpen(true);
  };

  const handleDeletePrompt = (prompt: Prompt) => {
    setPromptToDelete(prompt);
  };

  const confirmDeletePrompt = () => {
    if (promptToDelete) {
      setPrompts(prev => prev.filter(p => p.id !== promptToDelete.id));
      toast({ title: "Prompt Deleted", description: `"${promptToDelete.title}" has been removed.` });
      setPromptToDelete(null);
    }
  };

  const handleSavePrompt = (data: PromptFormData) => {
    if (editingPrompt && editingPrompt.id) { // Editing existing prompt
      setPrompts(prev => prev.map(p => p.id === editingPrompt.id ? { ...p, ...data, id: editingPrompt.id } as Prompt : p));
      toast({ title: "Prompt Updated", description: `"${data.title}" has been saved.` });
    } else { // Creating new prompt
      const newPrompt: Prompt = {
        ...data,
        id: `prompt-${Date.now()}-${Math.random().toString(16).slice(2)}`, // Generate a unique ID
        tools: data.tools || [],
        isFeatured: data.isFeatured || false,
      };
      setPrompts(prev => [newPrompt, ...prev]);
      toast({ title: "Prompt Created", description: `"${data.title}" has been added.` });
    }
    setIsModalOpen(false);
    setEditingPrompt(null);
  };
  
  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/home" className="flex items-center gap-2 text-lg font-semibold text-primary hover:opacity-80 transition-opacity">
            <Home className="h-5 w-5" />
            <span>Back to Site</span>
          </Link>
          <div className="flex items-center gap-2">
             <Link href="/auth?logout=true" className="text-sm text-muted-foreground hover:text-primary">
                Logout (Placeholder)
             </Link>
            <Button onClick={handleCreatePrompt} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Prompt
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Prompt Workspace</h1>
            <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search prompts by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-input border-border focus:border-primary"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px] bg-input border-border focus:border-primary">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Prompts List */}
        <div className="space-y-6">
          {Object.entries(groupedPrompts).length > 0 ? (
            Object.entries(groupedPrompts).map(([categoryId, categoryPrompts]) => {
              const category = categories.find(c => c.id === categoryId);
              const CategoryIcon = category?.Icon || Settings;
              if (!category) return null;

              return (
                <Card key={categoryId} className="shadow-md rounded-lg overflow-hidden">
                  <CardHeader 
                    className="flex flex-row justify-between items-center p-4 border-b bg-muted/50 cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => toggleCategoryExpansion(categoryId)}
                  >
                    <div className="flex items-center gap-2">
                      <CategoryIcon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl font-semibold text-foreground">{category.name}</CardTitle>
                    </div>
                    {expandedCategories[categoryId] ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                  </CardHeader>
                  {expandedCategories[categoryId] && (
                    <CardContent className="p-0">
                      {categoryPrompts.length > 0 ? (
                        <ul className="divide-y divide-border">
                          {categoryPrompts.map(prompt => (
                            <li key={prompt.id} className="p-4 hover:bg-accent/5 transition-colors">
                              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                                <div>
                                  <h3 className="text-lg font-medium text-foreground">{prompt.title}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{prompt.prompt}</p>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                      <span className="text-xs text-muted-foreground">Category: <span className="font-medium text-primary">{category.name}</span></span>
                                      {prompt.author && <span className="text-xs text-muted-foreground">Author: <span className="font-medium">{prompt.author}</span></span>}
                                      {prompt.isFeatured && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-700 dark:bg-yellow-500/30 dark:text-yellow-300">Featured</span>}
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-2 sm:mt-0 flex-shrink-0">
                                  <Button variant="outline" size="sm" onClick={() => handleEditPrompt(prompt)} className="text-xs">
                                    <Edit3 className="mr-1 h-3.5 w-3.5" /> Edit
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => handleDeletePrompt(prompt)} className="text-destructive hover:bg-destructive/10 hover:text-destructive text-xs">
                                    <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
                                  </Button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="p-4 text-sm text-muted-foreground text-center">No prompts in this category match your search.</p>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })
          ) : (
            <div className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-xl font-semibold text-foreground">No Prompts Found</p>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filters, or create a new prompt.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Promptly Admin Workspace.
        </div>
      </footer>

      {/* Modals */}
      {isModalOpen && (
        <PromptFormModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingPrompt(null); }}
          onSubmit={handleSavePrompt}
          initialData={editingPrompt}
          categories={categories}
        />
      )}

      {promptToDelete && (
        <AlertDialog open={!!promptToDelete} onOpenChange={() => setPromptToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this prompt?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The prompt "{promptToDelete.title}" will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setPromptToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeletePrompt} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

    