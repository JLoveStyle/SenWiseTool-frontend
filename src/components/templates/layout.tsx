import { SessionStatusType } from "@/types/type-tools";
import { Navbar as NavbarCustom } from "../molecules/navbar-custom";
import { Session } from "./session";

interface Props {
  children: React.ReactNode;
  sessionStatus?: SessionStatusType;
}

export const Layout = ({ children, sessionStatus }: Props) => {
  return (
    <Session sessionStatus={sessionStatus}>
      <header>
        {/* <Navbar /> */}
        <NavbarCustom />
      </header>
      <main>{children}</main>
    </Session>
  );
};
