"use client";

import clsx from "clsx";
import { useState } from "react";
import { PricingCard } from "../atoms/card-pricing";
import { Container } from "../atoms/container";
import { Switch } from "../ui/switch";

export const Pricing = () => {
  const [annualPricing, setAnnualPricing] = useState(true);

  const togglePricing = () => setAnnualPricing(!annualPricing);

  return (
    <Container className="bg-[#FFE4C9]">
      <div className="text-4xl font-bold text-center py-5">PRICING</div>
      <div className="toggle-pricing mr-5">
        <div className="flex justify-end gap-3 font-semibold text-gray-400">
          <span className={clsx(!annualPricing && "text-gray-950")}>
            Biannual
          </span>
          <Switch
            onCheckedChange={togglePricing}
            checked={annualPricing}
            className="outline-none"
          />
          <span className={clsx(annualPricing && "text-gray-950")}>Annual</span>
        </div>
      </div>
      <div>
        <PricingCard annualPricing={annualPricing} />
      </div>
    </Container>
  );
};
