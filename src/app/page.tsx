import { AboutUs } from "@/components/molecules/about-us";
import { Features } from "@/components/molecules/features";
import { Footer } from "@/components/molecules/footer";
import { HeroTop } from "@/components/molecules/hero-top";
import { Pricing } from "@/components/molecules/pricing";
import { Services } from "@/components/molecules/services";
import { Layout } from "@/components/templates/layout";
import React from "react";

export default function Home() {
  const sectionPages = [HeroTop, AboutUs, Features, Pricing, Services, Footer];

  return (
    <Layout>
      {sectionPages.map((sectionPage, index) => (
        <div
          key={index}
          id={`section-${index}`}
          className="section w-full"
        // style={{ backgroundColor: color }}
        >
          {React.createElement(sectionPage)}
        </div>
      ))}
    </Layout>
  );
}
