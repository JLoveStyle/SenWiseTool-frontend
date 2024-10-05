import { SessionStatusType } from "@/types/type-tools";
import { Navbar } from "../molecules/navbar";
import { Session } from "./session";

interface Props {
  children: React.ReactNode;
  sessionStatus?: SessionStatusType;
}

export const Layout = ({ children, sessionStatus }: Props) => {
  return (
    <Session sessionStatus={sessionStatus}>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </Session>
  );
};
