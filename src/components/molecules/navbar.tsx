"use client";
import { Route } from "@/lib/route";
import { AppLink } from "@/types/app-link";
import { ActiveLink } from "../atoms/active-link";
import { Container } from "../atoms/container";
import { Logo } from "../atoms/logo";
import { NavbarDropdown } from "../atoms/navbar-dropdown";
import { Button } from "../ui/button";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { UserRound } from "lucide-react";

export const Navbar = () => {
  const navLinks: AppLink[] = [
    {
      label: "HOME",
      baseUrl: Route.home,
    },
    {
      label: "ABOUT US",
      baseUrl: Route.aboutUs,
    },
    {
      label: " FEATURES",
      baseUrl: Route.features,
    },
    {
      label: "SERVICES",
      baseUrl: Route.services,
    },
    {
      label: "PRICING",
      baseUrl: Route.pricing,
    },
  ];

  const { userId } = useAuth();
  // const { isSignedIn, user } = useUser();
  console.log(userId);

  const loginButtons = (
    <div className={"login-btn flex gap-2"}>
      <Link href={Route.signIn}>
        <Button
          size="sm"
          variant="outline"
          className="border-primary text-primary hover:bg-primary/25 hover:text-primary"
        >
          Login
        </Button>
      </Link>
      <Link href={Route.signUp}>
        <Button size="sm" className="bg-primary hover:opacity-90">
          Register
        </Button>
      </Link>
    </div>
  );

  return (
    <Container>
      <div className="flex items-center gap-10 justify-between py-2">
        <div className="logo flex items-center gap-0">
          <Logo size="large" />
          {/* <span className="font-extrabold text-xl logo">SenWiseTool</span> */}
        </div>
        <div className="flex items-center gap-10">
          <ul className="hidden sm:flex items-center gap-5 xs:gap-2">
            {navLinks.map((navLink, index) => (
              <li key={index}>
                <ActiveLink
                  baseUrl={navLink.baseUrl}
                  className="whitespace-nowrap py-1 px-3"
                  style="border-b-primary font-medium border-b-4"
                  label={navLink.label}
                />
              </li>
            ))}
          </ul>
          <div className="block sm:hidden">
            <NavbarDropdown navLinks={navLinks} loginButtons={loginButtons} />
          </div>
          {userId ? (
            <Link href={Route.dashboard}>
              <UserRound />{" "}
            </Link>
          ) : (
            <div className="hidden sm:block">{loginButtons}</div>
          )}
        </div>
      </div>
    </Container>
  );
};
