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
          
          <div className="flex-1 relative h-[400px] w-full">
            <img
              src="/photo-1618160702438-9b02ab6515c9"
              alt="Delicious food presentation"
              className="w-full h-full object-cover rounded-lg shadow-xl animate-fade-in"
            />
          </div>
        </div>
      </div>
    </section>
  );
};