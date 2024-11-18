"use client";

import { Route } from "@/lib/route";
import { AppLink } from "@/types/app-link";
import { useAuth } from "@clerk/nextjs";
import { AlignRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ActiveLink } from "../atoms/active-link";
import { Container } from "../atoms/container";
import { Logo } from "../atoms/logo";
import { NavbarDropdown } from "../atoms/navbar-dropdown";
import { Button } from "../ui/button";

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      let currentSection: string | null = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarStyle =
    activeSection === null
      ? "bg-transparent text-black"
      : activeSection === "section-0"
      ? "bg-transparent text-black"
      : activeSection === "section-2"
      ? "bg-black text-white"
      : "bg-white text-black";

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
      label: "FEATURES",
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

  const loginButtons = (
    <div className="login-btn flex items-center gap-5">
      <Link href={Route.signIn}>
        <Button
          size="sm"
          variant="outline"
          className="border-none text-primary hover:bg-primary/25 hover:text-primary"
        >
          Login
        </Button>
      </Link>
      <Link href={Route.signUp}>
        <Button size="sm" className="bg-teal-600 hover:opacity-90">
          Register
        </Button>
      </Link>
    </div>
  );

  return (
    <nav className={`fixed w-full transition duration-500 ${navbarStyle} z-50`}>
      <Container>
        <div className="flex items-center justify-between py-4 w-full transition-all duration-500">
          <div className="logo flex items-center gap-2">
            <Logo size="large" />
            <span className="font-bold text-lg hidden md:block">
              SenWiseTool
            </span>
          </div>
          <div className="hidden lg:flex">
            <ul className="flex space-x-1 text-base">
              {navLinks.map((navLink, index) => (
                <li key={index} className="group relative">
                  <ActiveLink
                    baseUrl={navLink.baseUrl}
                    className="whitespace-nowrap py-2 px-4 transition-all duration-300 text-white hover:font-bold"
                    style="font-medium"
                    label={navLink.label}
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-10">
            {!isMenuOpen && (
              <>
                {userId ? (
                  <NavbarDropdown
                    navLinks={navLinks}
                    loginButtons={loginButtons}
                  />
                ) : (
                  loginButtons
                )}
              </>
            )}
            <button
              onClick={handleMenuToggle}
              className="lg:hidden block p-2 text-white hover:text-black transition-all duration-300"
            >
              {isMenuOpen ? <X size={30} /> : <AlignRight />}
            </button>
          </div>
        </div>
        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg mt-2 rounded-lg p-4">
            <ul className="space-y-3">
              {navLinks.map((navLink, index) => (
                <li key={index}>
                  <ActiveLink
                    baseUrl={navLink.baseUrl}
                    className="block py-2 px-4 text-gray-700 hover:text-primary"
                    style="font-medium"
                    label={navLink.label}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-4">{loginButtons}</div>
          </div>
        )}
      </Container>
    </nav>
  );
};
