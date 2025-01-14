import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="w-8 h-8 text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-xl font-bold text-secondary">foodtoks</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#pricing" 
            className="text-secondary hover:text-primary transition-colors"
          >
            Pricing
          </a>
          <Button variant="outline" asChild>
            <Link to="/auth?mode=sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/auth?mode=sign-up">Sign Up</Link>
          </Button>
        </nav>
        
        <Button className="md:hidden" variant="outline" size="icon">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>
    </header>
  );
};