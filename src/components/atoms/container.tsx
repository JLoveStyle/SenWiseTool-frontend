import clsx from "clsx";

interface Props {
  full?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Container = ({ full = false, className, children }: Props) => {
  return (
    <div className={clsx(!full && "sm:px-8 px-0", className)}>{children}</div>
  );
};
