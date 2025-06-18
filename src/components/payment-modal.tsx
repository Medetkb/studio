
"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { PricingPlan, PaymentFormData } from '@/types';
import { PaymentFormSchema } from '@/types';
import { CheckCircle, CreditCard, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan | null;
}

export function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      billingAddress: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset();
      setShowConfirmation(false);
      setIsSubmitting(false);
    }
  }, [isOpen, form]);

  const onSubmit = async (data: PaymentFormData) => {
    setIsSubmitting(true);
    console.log('Payment Data:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowConfirmation(true);
    // In a real app, you would call your payment provider here.
  };

  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground rounded-lg shadow-xl animate-fadeIn">
        {!showConfirmation ? (
          <>
            <DialogHeader className="pb-4 border-b">
              <DialogTitle className="text-2xl font-semibold flex items-center">
                <CreditCard className="mr-3 h-6 w-6 text-primary" />
                Upgrade to {plan.name}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                You are subscribing to the {plan.name} for {plan.price}/{plan.priceSuffix}.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1 max-h-[70vh] overflow-y-auto">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-background border-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} className="bg-background border-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="0000 0000 0000 0000" {...field} className="bg-background border-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} className="bg-background border-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} className="bg-background border-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                  control={form.control}
                  name="billingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Address (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, Anytown, USA" {...field} className="bg-background border-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      `Pay ${plan.price} & Upgrade`
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-6">
            <CheckCircle className="h-20 w-20 text-green-500 animate-fadeIn" style={{animationDelay: '100ms'}} />
            <DialogTitle className="text-3xl font-bold text-foreground animate-fadeIn" style={{animationDelay: '200ms'}}>Payment Successful!</DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground animate-fadeIn" style={{animationDelay: '300ms'}}>
              Thank you for upgrading to the {plan.name}! You now have access to all its features.
            </DialogDescription>
            <Button 
              onClick={onClose} 
              className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 animate-fadeIn"
              style={{animationDelay: '400ms'}}
            >
              Close
            </Button>
          </div>
        )}
         <DialogClose asChild>
            <button 
              className={cn(
                "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                showConfirmation && "hidden" // Hide close button on confirmation screen if desired, or style differently
              )}
              aria-label="Close"
              onClick={onClose}
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              <span className="sr-only">Close</span>
            </button>
          </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
