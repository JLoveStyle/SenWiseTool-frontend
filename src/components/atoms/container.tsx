import clsx from "clsx";

interface Props {
  full?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Container = ({ full = false, className, children }: Props) => {
  return <div className={clsx(!full && "px-8", className)}>{children}</div>;
};
