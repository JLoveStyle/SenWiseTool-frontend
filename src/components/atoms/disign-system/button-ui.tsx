import { Button } from "@/components/ui/button";
import { IconProps } from "@/types/icon-props";
import clsx from "clsx";
import Link from "next/link";
import { Icon } from "../icon";
import { Spinner } from "../spinner/spinner";

interface Props {
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  action?: Function;
  linkType?: "internal" | "external";
  baseURL?: string;
  size?: "very-small" | "small" | "medium" | "large" | "very-large";
  icon?: IconProps;
  iconPosition?: "left" | "right";
  className?: string;
  full?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  title?: string;
  style?: object;
}

export const ButtonUI: React.FC<Props> = ({
  children,
  className,
  type = "button",
  action = () => {},
  linkType = "internal",
  baseURL,
  size = "medium",
  icon,
  iconPosition = "left",
  full = false,
  isLoading = false,
  disabled = false,
  title,
  style,
}) => {
  let sizeStyle: string = "",
    iconSize: number = 0;

  const handleClick = () => {
    if (action) {
      action();
    }
  };

  switch (size) {
    case "very-small":
      sizeStyle = "px-2 pb-[4px] pt-[5px] text-[13px]";
      iconSize = 20;
      break;
    case "small":
      sizeStyle = "px-4 pb-[5px] pt-[6px]";
      iconSize = 25;
      break;
    case "medium": // medium
      sizeStyle = "px-6 pb-2 pt-2.5";
      iconSize = 30;
      break;
    case "large":
      sizeStyle = "px-7 pb-2.5 pt-3";
      iconSize = 40;
      break;
    case "very-large":
      sizeStyle = "px-9 pb-3.5 pt-4";
      iconSize = 50;
      break;
  }

  const btnElement = (
    <Button
      type={type}
      title={title}
      onClick={handleClick}
      disabled={disabled || isLoading ? true : false}
      className={clsx(
        "relative disabled:opacity-70 disabled:cursor-not-allowed text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:opacity-85 focus:opacity-85 active:opacity-50 focus:outline-none focus:ring-0 motion-reduce:transition-none",
        full && "w-full",
        isLoading && "cursor-not-allowed",
        className
      )}
      style={style}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="small" />
        </div>
      )}

      <div
        className={clsx(
          "flex justify-center items-center gap-2",
          isLoading && "invisible"
        )}
      >
        <Icon
          icon={icon}
          position={iconPosition}
          size={children ? 18 : iconSize}
        >
          {children}
        </Icon>
      </div>
    </Button>
  );

  return (
    <>
      {baseURL ? (
        <Link
          href={baseURL}
          target={linkType === "external" ? "_blank" : "_self"}
        >
          {btnElement}
        </Link>
      ) : (
        btnElement
      )}
    </>
  );
};
