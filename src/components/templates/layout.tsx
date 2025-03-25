import { SessionStatusType } from "@/types/type-tools";
import { Navbar as NavbarCustom } from "../molecules/navbar";

interface Props {
  children: React.ReactNode;
  sessionStatus?: SessionStatusType;
}

export const Layout = ({ children, sessionStatus }: Props) => {
  return (
    <>
      <header>
        {/* <Navbar /> */}
        <NavbarCustom />
      </header>
      <main>{children}</main>
    </>
  );
};
