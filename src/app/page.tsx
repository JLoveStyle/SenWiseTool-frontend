import { AboutUs } from "@/components/molecules/about-us";
import { Features } from "@/components/molecules/features";
import { Footer } from "@/components/molecules/footer";
import { HeroTop } from "@/components/molecules/hero-top";
import { Pricing } from "@/components/molecules/pricing";
import { Layout } from "@/components/templates/layout";
import React from "react";

export default function Home() {
  // const sectionColors = [
  //   "#559065",
  //   "#7eb3a7",
  //   "#ffdd99",
  //   "#a29bfe",
  //   "#fab1a0",
  //   "#81ecec",
  // ];

  const sectionPages = [HeroTop, AboutUs, Features, Footer, Pricing];

  return (
    <Layout>
      {sectionPages.map((sectionPage, index) => (
        <div
          key={index}
          id={`section-${index}`}
          className="section w-full h-screen"
          // style={{ backgroundColor: color }}
        >
          {React.createElement(sectionPage)}
        </div>
      ))}
      {/* <div>
        {sectionColors.map((color, index) => (
          <div
            key={index}
            id={`section-${index}`}
            className="section w-full h-screen"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div> */}

      {/* <HeroTop />
      <AboutUs />
      <Features />
      <Pricing />
      <Footer /> */}
    </Layout>
  );
}
