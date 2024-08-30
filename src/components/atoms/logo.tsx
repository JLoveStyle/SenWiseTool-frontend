import clsx from "clsx";
import Image from "next/image";

interface Props {
  size?: "very-small" | "small" | "medium" | "large" | "very-large";
  className?: string;
}

export const Logo = ({ size = "medium", className }: Props) => {
  let baseUrl: string,
    width: number = 0,
    height = 0;

  switch (size) {
    case "very-small":
      width = 24;
      break;
    case "small":
      width = 34;
      break;
    case "medium": // default
      width = 50;
      break;
    case "large":
      width = 70;
      break;
    case "very-large":
      width = 95;
      break;
  }

  return (
    <div className={clsx(className)}>
      <Image
        // loader={ImageLoader}
        src="/images/logo.png"
        alt="SenWiseTool logo"
        width={width}
        height={height}
        loading="lazy"
      />
    </div>
  );
};
