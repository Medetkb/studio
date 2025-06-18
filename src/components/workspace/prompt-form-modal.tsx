
"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { PromptFormData, Category as AppCategory } from '@/types';
import { PromptFormSchema } from '@/types';
import { Loader2 } from 'lucide-react';

interface PromptFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PromptFormData) => void;
  initialData?: PromptFormData | null;
  categories: AppCategory[];
}

export function PromptFormModal({ isOpen, onClose, onSubmit, initialData, categories }: PromptFormModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<PromptFormData>({
    resolver: zodResolver(PromptFormSchema),
    defaultValues: initialData || {
      title: '',
      prompt: '',
      category: '',
      tools: [],
      isFeatured: false,
      author: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset({
        title: '',
        prompt: '',
        category: '',
        tools: [],
        isFeatured: false,
        author: 'Admin', // Default author or fetch from user session
      });
    }
  }, [initialData, form, isOpen]);


  const handleFormSubmit = async (data: PromptFormData) => {
    setIsSubmitting(true);
    // Simulate API call if needed
    // await new Promise(resolve => setTimeout(resolve, 1000));
    onSubmit(data);
    setIsSubmitting(false);
    // onClose(); // Usually handled by the parent component after successful submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-lg bg-card text-card-foreground rounded-lg shadow-xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-2xl font-semibold">
            {initialData ? 'Edit Prompt' : 'Create New Prompt'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {initialData ? 'Update the details of your prompt.' : 'Fill in the details to add a new prompt.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 p-1 max-h-[70vh] overflow-y-auto pr-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Blog Post Idea Generator" {...field} className="bg-background border-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter the full prompt text here..." {...field} className="bg-background border-input min-h-[120px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-input">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Placeholder for Tools - can be a simple text input for now or a more complex tag input later */}
            <FormField
              control={form.control}
              name="tools"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tools (comma-separated)</FormLabel>
                  <FormControl>
                    <Input 
                        placeholder="E.g., ChatGPT, Claude" 
                        {...field} 
                        onChange={(e) => field.onChange(e.target.value.split(',').map(tool => tool.trim()).filter(tool => tool))}
                        value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                        className="bg-background border-input" 
                    />
                  </FormControl>
                  <FormDescription className="text-xs">Enter AI tools, separated by commas.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-background">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Mark as Featured
                    </FormLabel>
                    <FormDescription>
                      Featured prompts appear in a special section on the homepage.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Author's name" {...field} className="bg-background border-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <DialogFooter className="pt-6">
               <DialogClose asChild>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  initialData ? 'Save Changes' : 'Create Prompt'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

    