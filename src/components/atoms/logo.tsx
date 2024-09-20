import styles from "@/app/styles/logo.module.css";
import clsx from "clsx";
import Image from "next/image";

interface Props {
  size?: "very-small" | "small" | "medium" | "large" | "very-large";
  className?: string;
  variant?: "image" | "text";
}

export const Logo = ({
  size = "medium",
  className,
  variant = "image",
}: Props) => {
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

  if (variant === "text") {
    return (
      <div className="my-3">
        <span className={styles.customFont}>SenWiseTool</span>
      </div>
    );
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
