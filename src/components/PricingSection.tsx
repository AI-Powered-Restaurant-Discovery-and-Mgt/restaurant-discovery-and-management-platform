import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

interface PricingTier {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  isLimited?: boolean;
  buttonText: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for trying out our platform",
    features: ["Basic menu management", "Customer feedback", "Basic analytics"],
    buttonText: "Get Started",
  },
  {
    name: "Starter",
    monthlyPrice: 29,
    annualPrice: 290,
    description: "Great for small restaurants",
    features: ["Advanced menu management", "Priority support", "Detailed analytics", "Custom branding"],
    buttonText: "Start Free Trial",
  },
  {
    name: "Pro",
    monthlyPrice: 79,
    annualPrice: 790,
    description: "Best for growing businesses",
    features: ["Everything in Starter", "API access", "Advanced integrations", "Custom reports", "Team management"],
    isPopular: true,
    buttonText: "Start Free Trial",
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    annualPrice: 1990,
    description: "For large restaurant chains",
    features: ["Everything in Pro", "Dedicated support", "Custom development", "SLA guarantee", "Advanced security"],
    buttonText: "Contact Sales",
  },
  {
    name: "Lifetime",
    monthlyPrice: 999,
    annualPrice: 999,
    description: "One-time payment, lifetime access",
    features: ["All Enterprise features", "Lifetime updates", "Priority feature requests", "Exclusive community"],
    isLimited: true,
    buttonText: "Get Lifetime Access",
  },
];

const comparisonFeatures = [
  "Menu Management",
  "Customer Feedback",
  "Analytics Dashboard",
  "API Access",
  "Custom Branding",
  "Priority Support",
  "Team Management",
  "Custom Development",
  "SLA Guarantee",
];

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-16 px-4 animate-fade-in">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 mb-8">Choose the plan that's right for your restaurant</p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-lg ${!isAnnual ? "font-semibold" : ""}`}>Monthly</span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-lg ${isAnnual ? "font-semibold" : ""}`}>
              Annual <span className="text-primary">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {pricingTiers.map((tier) => (
            <Card key={tier.name} className="relative flex flex-col">
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              {tier.isLimited && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Limited Time
                </div>
              )}
              <CardHeader className="text-center">
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <p className="text-gray-600">{tier.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? tier.annualPrice : tier.monthlyPrice}
                  </span>
                  {tier.name !== "Lifetime" && (
                    <span className="text-gray-600">/{isAnnual ? "year" : "month"}</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="text-primary w-5 h-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">Compare Plans</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Features</TableHead>
                  {pricingTiers.map((tier) => (
                    <TableHead key={tier.name} className="text-center">
                      {tier.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonFeatures.map((feature) => (
                  <TableRow key={feature}>
                    <TableCell className="font-medium">{feature}</TableCell>
                    {pricingTiers.map((tier) => (
                      <TableCell key={`${tier.name}-${feature}`} className="text-center">
                        {tier.features.some((f) => 
                          f.toLowerCase().includes(feature.toLowerCase()) ||
                          f.includes("Everything in")
                        ) ? (
                          <Check className="mx-auto text-primary w-5 h-5" />
                        ) : (
                          <X className="mx-auto text-gray-400 w-5 h-5" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};