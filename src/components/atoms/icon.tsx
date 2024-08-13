import { IconProps } from "@/types/icon-props";

interface Props {
  icon?: IconProps;
  position?: "left" | "right";
  size?: number;
  children?: React.ReactNode;
}

export const Icon = ({
  icon,
  position = "left",
  size = 20,
  children,
}: Props) => {
  return (
    <>
      {icon && position === "left" && <icon.icon size={size} />}
      {children}
      {icon && position === "right" && <icon.icon size={size} />}
    </>
  );
};
