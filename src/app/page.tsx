import { Layout } from "@/components/templates/layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/images/logo.png"
            height={150}
            width={150}
            alt="SenWiseTool"
          />
          <h1 className="text-3xl font-extrabold text-gray-700">
            hello SENWISETOOL{" "}
          </h1>
        </div>
      </div>
    </Layout>
  );
}
