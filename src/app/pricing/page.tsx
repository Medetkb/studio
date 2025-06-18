
"use client";

import type React from 'react';
import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import type { PricingPlan } from '@/types';
import { PaymentModal } from '@/components/payment-modal'; // Create this component

const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Plan',
    price: '$5',
    priceSuffix: 'month',
    features: [
      'Access to 50 premium prompts/month',
      'Light/dark mode',
      'Save prompts to favorites',
    ],
    ctaText: 'Choose Starter',
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '$15',
    priceSuffix: 'month',
    features: [
      'Unlimited premium prompts',
      'Personalized prompt feed',
      'Early access to new features',
      'Priority support',
    ],
    isPopular: true,
    ctaText: 'Choose Pro',
  },
  {
    id: 'ultimate',
    name: 'Ultimate Plan',
    price: '$29',
    priceSuffix: 'month',
    features: [
      'All Pro features',
      'Private prompt collections',
      'Team collaboration tools',
      'Custom AI assistant setup',
    ],
    ctaText: 'Choose Ultimate',
  },
];

export default function PricingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const handleChoosePlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow py-12 md:py-20 animate-fadeIn">
        <Container>
          <section className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fadeIn" style={{animationDelay: '100ms'}}>
              Find the Perfect Plan
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fadeIn" style={{animationDelay: '200ms'}}>
              Choose the plan that best suits your needs and unlock powerful AI prompt features.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {pricingPlans.map((plan, index) => (
              <Card
                key={plan.id}
                className={`flex flex-col bg-card text-card-foreground shadow-lg rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-103 animate-fadeIn ${
                  plan.isPopular ? 'border-2 border-primary relative ring-2 ring-primary/50 shadow-primary/20' : 'border-border'
                }`}
                style={{ animationDelay: `${(index + 1) * 150 + 200}ms` }}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg shadow-md">
                    POPULAR
                  </div>
                )}
                <CardHeader className="p-6 md:p-8 text-center border-b">
                  <CardTitle className="text-2xl md:text-3xl font-semibold text-foreground mb-2">{plan.name}</CardTitle>
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    {plan.price}
                    <span className="text-sm font-normal text-muted-foreground">/{plan.priceSuffix}</span>
                  </p>
                </CardHeader>
                <CardContent className="p-6 md:p-8 flex-grow">
                  <ul className="space-y-3 text-muted-foreground">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 md:p-8 mt-auto border-t">
                  <Button
                    onClick={() => handleChoosePlan(plan)}
                    size="lg"
                    className={`w-full text-lg font-semibold transition-all duration-200 ${
                      plan.isPopular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-muted dark:hover:bg-muted/80 dark:text-muted-foreground'
                    }`}
                  >
                    {plan.ctaText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </section>
        </Container>
      </main>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        plan={selectedPlan}
      />

      <footer className="py-8 mt-auto border-t border-border/50 animate-fadeIn" style={{ animationDelay: '800ms' }}>
        <Container className="text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Promptly. All rights reserved.</p>
          <p className="mt-1">Flexible plans for every creator.</p>
        </Container>
      </footer>
    </div>
  );
}
