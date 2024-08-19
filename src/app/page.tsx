import { AboutUs } from "@/components/molecules/about-us";
import { Features } from "@/components/molecules/features";
import { HeroTop } from "@/components/molecules/hero-top";
import { Layout } from "@/components/templates/layout";

export default function Home() {
  return (
    <Layout>
      <HeroTop />
      <AboutUs />
      <Features />
    </Layout>
  );
}
