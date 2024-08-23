import { cardDataFeature } from "@/lib/card-data";
import Image from "next/image";
import { Container } from "../atoms/container";

export const Features = () => {
  return (
    <Container>
      <div className="pb-28">
        <div className="text-4xl font-bold text-center pt-10">Features</div>
        <div className="flex justify-between items-center feature-section-image">
          <Container className="bg-gradient-to-br sm:bg-gradient-to-r from-neutral-50 sm:via-white to-white/0 h-screen sm:w-3/4">
            <div className=" flex flex-col justify-center h-full gap-20 sm:gap-10">
              <h1 className="font-extrabold text-3xl text-black sm:text-5xl sm:max-w-xl text-center sm:text-start px-2">
                Quality data collection for challenging settings
              </h1>
              <div className="text-xl px-2 py-4 space-y-2 text-black sm:text-gray-600 sm:font-semibold text-center sm:text-start">
                <p className="sub-paragraph">
                  SenWiseTool is developed for practitioners, by practitioners.
                </p>
                <p className="sub-paragraph">
                  It is intuitive to use and accessible, making it easy to get
                  started quickly. <br className="sm:hidden" />
                  It can be used offline, on any device.
                </p>
                <p className="sub-paragraph">
                  Most importantly, all its core functionalities are free to use
                  for nonprofit organizations.
                </p>
              </div>
            </div>
          </Container>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-24 px-10">
          {cardDataFeature.map((dataFeature, index) => (
            <div key={index} className="max-w-md">
              <div className="flex gap-5 items-center pb-4">
                <Image
                  src={dataFeature.image}
                  alt="illustration"
                  width={100}
                  height={100}
                />
                <h2 className="text-3xl font-bold">{dataFeature.title}</h2>
              </div>
              <div className="space-y-4">
                {dataFeature.content.map((a_feature, sub_index) => (
                  <p key={sub_index} className="text-sm font-bold">
                    {a_feature}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
