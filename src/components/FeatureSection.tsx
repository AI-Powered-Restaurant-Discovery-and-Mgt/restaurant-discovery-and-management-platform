import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureSectionProps {
  title: string;
  features: Feature[];
  ctaText: string;
  ctaLink: string;
  alignment?: "left" | "right";
}

export const FeatureSection = ({
  title,
  features,
  ctaText,
  ctaLink,
  alignment = "left",
}: FeatureSectionProps) => {
  return (
    <section className={`py-16 px-4 ${alignment === "right" ? "bg-muted" : ""}`}>
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
          {title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button asChild size="lg">
            <Link to={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};