
// src/app/page.tsx (New Homepage - formerly /promo content)
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
// Navbar import removed as per previous step for promo page
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Archive, Save, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: 'Promptly - Powerful AI Prompts | Free & Premium Collections',
  description: 'Discover and use curated AI prompts for ChatGPT, Claude, Grok, and more. Boost your productivity with Promptly\'s extensive library.',
  openGraph: {
    title: 'Promptly - Powerful AI Prompts | Free & Premium Collections',
    description: 'Supercharge your AI interactions with a vast library of curated prompts. Save time and get better results.',
    images: [
      {
        url: '/promptly-dashboard-preview.png', // Updated OG image
        width: 1200, // Standard OG width
        height: 630, // Standard OG height
        alt: 'Promptly AI Prompt Library Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Promptly - Powerful AI Prompts | Free & Premium Collections',
    description: 'Discover curated AI prompts to boost your productivity. Works with ChatGPT, Claude, and more!',
    images: ['/promptly-dashboard-preview.png'], // Updated Twitter image
  },
};

const features = [
  {
    icon: Zap,
    title: "Works with Your Favorite AI Tools",
    description: "Seamlessly copy prompts for ChatGPT, Claude, Grok, DeepSeek, and other leading AI models."
  },
  {
    icon: Archive,
    title: "Curated & Organized Collections",
    description: "Explore prompts by category, filter by tool, and discover handpicked collections for any task."
  },
  {
    icon: Save,
    title: "Save Time & Boost Productivity",
    description: "Stop searching for the perfect prompt. Find what you need quickly and get back to creating."
  }
];

const benefits = [
    "Save hours searching for the right prompts",
    "Access a constantly growing library, updated regularly",
    "Organized categories for quick navigation",
    "Supports multiple AI tools like ChatGPT, Claude, Grok & more",
    "Easy one-click copy-to-clipboard functionality",
    "Unlock premium features with our Pro plan"
];


export default function PromoTurnedHomePage() { // Renamed function for clarity
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar instance removed */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background to-muted/30 dark:from-background dark:to-muted/10 animate-fadeIn opacity-0">
          <Container className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Discover Powerful AI Prompts.
              <br className="hidden md:block" />
              <span className="text-primary">Free & Premium</span> Collections.
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Supercharge your AI interactions with Promptly. Access a vast library of curated prompts for ChatGPT, Claude, Grok, DeepSeek, and more. Save time, boost creativity, and achieve better results.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3 shadow-lg transition-transform hover:scale-105 animate-fadeIn opacity-0" style={{animationDelay: '200ms'}} asChild>
              <Link href="/home">Get Started for Free</Link>
            </Button>
          </Container>
        </section>

        {/* Visual Preview Section */}
        <section className="py-12 md:py-20 bg-background animate-fadeIn opacity-0" style={{animationDelay: '300ms'}}>
          <Container className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">See Promptly in Action</h2>
            <div className="shadow-2xl rounded-lg overflow-hidden border border-border">
              <Image
                src="/promptly-dashboard-preview.png" // Updated image source
                alt="Preview of Promptly in action" // Updated alt text
                width={1000}
                height={600}
                className="w-full h-auto"
                // data-ai-hint removed as a specific image is now used
              />
            </div>
          </Container>
        </section>
        
        {/* Benefits Section */}
        <section className="py-12 md:py-20 bg-muted/50 dark:bg-muted/20 animate-fadeIn opacity-0" style={{animationDelay: '400ms'}}>
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Why Choose Promptly?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.slice(0,3).map((benefit, index) => ( // Show first 3 in cards
                <Card key={index} className="bg-card text-card-foreground shadow-lg rounded-xl flex flex-col items-center text-center p-6 transition-all duration-300 hover:shadow-xl hover:scale-103 animate-fadeIn opacity-0" style={{animationDelay: `${index * 100 + 500}ms`}}>
                   <div className="p-3 bg-primary/10 rounded-full mb-4">
                     <CheckCircle className="h-8 w-8 text-primary" />
                   </div>
                  <p className="text-lg font-medium text-foreground">{benefit}</p>
                </Card>
              ))}
            </div>
             <div className="mt-10 text-center">
                 <ul className="space-y-3 max-w-md mx-auto text-left">
                    {benefits.slice(3).map((benefit, index) => (
                         <li key={index} className="flex items-start text-muted-foreground animate-fadeIn opacity-0" style={{animationDelay: `${(index+3) * 100 + 500}ms`}}>
                            <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-1" />
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>
             </div>
          </Container>
        </section>


        {/* Features Section */}
        <section className="py-12 md:py-20 bg-background animate-fadeIn opacity-0" style={{animationDelay: '600ms'}}>
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Everything You Need for Effective Prompting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={feature.title}
                  className="bg-card text-card-foreground shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-103 animate-fadeIn opacity-0"
                  style={{ animationDelay: `${index * 100 + 700}ms` }}
                >
                  <CardHeader className="flex flex-row items-center gap-4 pb-4 p-0">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-2">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/80 to-primary dark:from-primary/70 dark:to-primary/90 text-primary-foreground animate-fadeIn opacity-0" style={{animationDelay: '800ms'}}>
          <Container className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Elevate Your AI Game?
            </h2>
            <p className="mt-4 text-lg sm:text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of users leveraging Promptly to create better content, faster.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-background text-primary hover:bg-muted border-transparent text-lg px-8 py-3 shadow-lg transition-transform hover:scale-105"
              asChild
            >
              <Link href="/auth">Sign Up Now</Link>
            </Button>
          </Container>
        </section>
      </main>
      <footer className="py-8 mt-auto border-t border-border/50 animate-fadeIn opacity-0" style={{ animationDelay: '900ms' }}>
        <Container className="text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Promptly. All rights reserved.</p>
          <p className="mt-1">Your ultimate AI prompt companion.</p>
        </Container>
      </footer>
    </div>
  );
}
