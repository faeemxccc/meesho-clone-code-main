import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      <div className="container relative mx-auto px-4 py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              New Arrivals
            </div>
            <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
              Shop the Latest
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}Trends
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover amazing deals on fashion, electronics, home decor, and more. Get up to 70% off on selected items!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Categories
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px]">
            <img
              src={heroBanner}
              alt="Shopping banner"
              className="rounded-2xl object-cover w-full h-full shadow-[var(--shadow-hover)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
