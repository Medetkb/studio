
import { HeroSection } from "@/components/hero-section";
import { TagButtonsSection } from "@/components/tag-buttons-section";
import { UpgradeProSection } from "@/components/upgrade-pro-section";
import { CuratedCollectionsSection } from "@/components/curated-collections-section";
// CategoryCardsSection is removed as its functionality is merged into CuratedCollectionsSection
import { FeaturedPromptsSection } from "@/components/featured-prompts-section";
import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <TagButtonsSection />
        <FeaturedPromptsSection /> 
        <div className="py-4 animate-fadeIn animation-delay-500 opacity-0">
          <Separator className="my-6 md:my-8 max-w-4xl mx-auto" />
        </div>
        {/* CategoryCardsSection removed from here */}
        <CuratedCollectionsSection /> {/* This section is now overhauled */}
        <div className="py-4 animate-fadeIn animation-delay-500 opacity-0">
          <Separator className="my-6 md:my-8 max-w-4xl mx-auto" />
        </div>
        <UpgradeProSection />
      </main>
      <footer className="py-8 mt-12 border-t border-border/50 animate-fadeIn animation-delay-500 opacity-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Promptly. All rights reserved.</p>
          <p className="mt-1">Designed for AI enthusiasts and professionals.</p>
        </div>
      </footer>
    </div>
  );
}
