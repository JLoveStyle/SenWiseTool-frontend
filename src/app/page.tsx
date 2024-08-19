import { AboutUs } from "@/components/molecules/about-us";
import { HeroTop } from "@/components/molecules/hero-top";
import { Layout } from "@/components/templates/layout";

export default function Home() {
  return (
    <Layout>
      <HeroTop />
      {/* <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <SwtSpinner />
          <h1 className="text-3xl font-extrabold text-gray-700">
            hello SENWISETOOL{" "}
          </h1>
        </div>
      </div> */}
      <AboutUs />
    </Layout>
  );
}
