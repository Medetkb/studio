import { HeroSection } from "@/components/hero-section";
import { TagButtonsSection } from "@/components/tag-buttons-section";
import { UpgradeProSection } from "@/components/upgrade-pro-section";
import { CuratedCollectionsSection } from "@/components/curated-collections-section";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <HeroSection />
      <TagButtonsSection />
      <div className="py-4">
        <Separator className="my-6 md:my-8 max-w-4xl mx-auto" />
      </div>
      <UpgradeProSection />
       <div className="py-4">
        <Separator className="my-6 md:my-8 max-w-4xl mx-auto" />
      </div>
      <CuratedCollectionsSection />
      <footer className="py-8 mt-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Promptly. All rights reserved.</p>
          <p className="mt-1">Designed for AI enthusiasts and professionals.</p>
        </div>
      </footer>
    </main>
  );
}
