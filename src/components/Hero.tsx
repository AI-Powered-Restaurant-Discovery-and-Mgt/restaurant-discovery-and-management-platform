import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-4 animate-fade-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 leading-tight">
              AI-Powered Restaurant Discovery & Management Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              For Restaurant Owners: Streamline your operations with AI.
              <br />
              For Customers: Discover, order, and connect with restaurants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link to="/restaurants">Explore Restaurants</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative h-[400px] w-full overflow-hidden rounded-2xl shadow-xl">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format"
              />
              <source
                media="(min-width: 768px)"
                srcSet="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format"
              />
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format"
                alt="Elegant fine dining experience"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
};