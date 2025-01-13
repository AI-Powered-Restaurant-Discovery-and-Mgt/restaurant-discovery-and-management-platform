import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-4 animate-fade-in">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 leading-tight">
          AI-Powered Restaurant Discovery & Management Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          For Restaurant Owners: Streamline your operations with AI.
          <br />
          For Customers: Discover, order, and connect with restaurants.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg">
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg">
            <Link to="/restaurants">Explore Restaurants</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};