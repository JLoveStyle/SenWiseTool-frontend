import { CardAboutUs } from "../atoms/card-about-us";
import { Container } from "../atoms/container";
import { Button } from "../ui/button";

export const AboutUs = () => {
  return (
    <Container className="bg-about-us h-full">
      <div>
        <div className="text-4xl font-bold text-center py-5">ABOUT US</div>
        <div>
          <CardAboutUs />
        </div>
        <div className="text-center py-5">
          <Button>SUBSCRIBE NOW</Button>
        </div>
      </div>
    </Container>
  );
};
