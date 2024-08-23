import { AboutUs } from "@/components/molecules/about-us";
import { Features } from "@/components/molecules/features";
import { Footer } from "@/components/molecules/footer";
import { HeroTop } from "@/components/molecules/hero-top";
import { Pricing } from "@/components/molecules/pricing";
import { Layout } from "@/components/templates/layout";

export default function Home() {
  return (
    <Layout>
      <HeroTop />
      <AboutUs />
      <Features />
      <Pricing />
      <Footer />
    </Layout>
  );
}
