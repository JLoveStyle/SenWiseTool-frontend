"use client";

import { Route } from "@/lib/route";
import { AppLink } from "@/types/app-link";
import { useAuth } from "@clerk/nextjs";
import { AlignRight, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "../atoms/container";
import { Logo } from "../atoms/logo";
import { Button } from "../ui/button";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const navLinks: AppLink[] = [
    { label: "HOME", baseUrl: "home" },
    { label: "ABOUT US", baseUrl: "about-us" },
    { label: "FEATURES", baseUrl: "features" },
    { label: "PRICING", baseUrl: "pricing" },
    { label: "SERVICES", baseUrl: "services" },
  ];

  const { userId } = useAuth();

  // Scroll listener for sticky effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer to activate navbar link
  useEffect(() => {
    const sections = navLinks.map((link) =>
      document.getElementById(link.baseUrl)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [navLinks]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
    const target = document.querySelector(`#${id}`);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset,
        behavior: "smooth",
      });
    }
  };

  const loginButtons = (
    <div className="login-btn flex items-center gap-5">
      <Link href={Route.signIn}>
        <Button
          size="sm"
          variant="outline"
          className="border-none text-primary dark:text-white hover:bg-primary/25 hover:text-primary dark:hover:bg-white/25"
        >
          Login
        </Button>
      </Link>
      <Link href={Route.signUp}>
        <Button
          size="sm"
          className="bg-teal-600 dark:bg-teal-500 hover:opacity-90"
        >
          Register
        </Button>
      </Link>
    </div>
  );

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg text-black dark:text-white"
          : "bg-transparent text-white"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-4 w-full">
          {/* Logo */}
          <div className="logo flex items-center gap-2">
            <Logo size="large" />
            <span className="font-extrabold text-xl hidden md:block">
              SenWiseTool
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <ul className="flex space-x-4 text-base">
              {navLinks.map((navLink, index) => (
                <li key={index} className="group relative">
                  <a
                    href={`#${navLink.baseUrl}`}
                    onClick={(event) => scrollToSection(event, navLink.baseUrl)}
                    className={`whitespace-nowrap py-2 px-4 font-medium transition-all duration-300 ${
                      activeSection === navLink.baseUrl
                        ? "text-primary"
                        : isScrolled
                        ? "text-gray-800 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                        : "text-white hover:text-primary"
                    }`}
                  >
                    {navLink.label}
                  </a>
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 ${
                      activeSection === navLink.baseUrl
                        ? "w-full"
                        : "group-hover:w-full"
                    }`}
                  ></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Login & Mobile Menu */}
          <div className="flex items-center gap-5">
            {!isMenuOpen && (
              <>
                {userId ? (
                  <Link
                    href={Route.dashboard}
                    className="hover:bg-primary p-1 hover:rounded-full"
                  >
                    <User />
                  </Link>
                ) : (
                  loginButtons
                )}
              </>
            )}
            <button
              onClick={handleMenuToggle}
              className={`lg:hidden block p-2 ${
                isScrolled ? "text-gray-800 dark:text-gray-300" : "text-white"
              } hover:text-primary transition-all duration-300`}
            >
              {isMenuOpen ? <X size={30} /> : <AlignRight />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-800 shadow-lg mt-2 rounded-lg p-4">
            <ul className="space-y-3">
              {navLinks.map((navLink, index) => (
                <li key={index}>
                  <a
                    href={`#${navLink.baseUrl}`}
                    onClick={(event) => scrollToSection(event, navLink.baseUrl)}
                    className={`block py-2 px-4 text-gray-800 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-300 ${
                      activeSection === navLink.baseUrl ? "text-primary" : ""
                    }`}
                  >
                    {navLink.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </nav>
  );
};
