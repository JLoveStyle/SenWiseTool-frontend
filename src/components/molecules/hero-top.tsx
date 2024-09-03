import Image from "next/image";
import { Container } from "../atoms/container";
import { Button } from "../ui/button";

export const HeroTop = () => {
  return (
    <Container
      full
      className="flex justify-between items-center hero-top-image"
    >
      <Container className="bg-gradient-to-br sm:bg-gradient-to-r from-black sm:from-neutral-50 sm:via-white to-white/0 h-screen sm:w-3/4">
        <div className=" flex flex-col pt-16 h-full gap-20 sm:gap-10">
          <div className="sm:hidden flex items-center justify-center w-full -my-10">
            <Image src="/images/logo.png" width={200} height={200} alt="logo" />
          </div>
          <h1 className="font-extrabold text-3xl text-white sm:text-black sm:text-5xl sm:max-w-xl text-center sm:text-start">
            Powerful and intuitive data collection tools to make an impact
          </h1>
          <p className="text-xl sm:text-gray-600 text-white sm:font-normal text-center sm:text-start">
            High quality data collection for everyone
          </p>
          <div className="flex items-center gap-10 justify-center sm:justify-start">
            <Button className="bg-primary hover:opacity-90 px-10">
              Get started
            </Button>
            {/* <Button
              variant="outline"
              className="border-primary bg-transparent text-primary hover:bg-primary/25 hover:text-primary rounded-none"
            >
              Login
            </Button> */}
          </div>
        </div>
      </Container>
    </Container>
  );
};
