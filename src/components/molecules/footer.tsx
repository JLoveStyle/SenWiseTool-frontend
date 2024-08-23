import { footerLinks, socialFooterLink } from "@/lib/footer-links";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../atoms/container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { Language } from "../atoms/language";
import { ToggleTheme } from "../atoms/toggle-theme";

export const Footer = () => {
  return (
    <Container className="bg-black text-white py-5">
      <div className="divide-y divide-gray-600">
        <div className="flex justify-center w-full flex-col sm:flex-row gap-10 py-5">
          <div className="flex justify-between items-center flex-wrap gap-5 w-full">
            {footerLinks.map((footerLink, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h2 className="text-center">{footerLink.title}</h2>
                <div className="flex flex-col justify-center items-center gap-1 text-sm text-gray-300">
                  {footerLink.links.map((link, indexLink) => (
                    <Link href={link.baseUrl}>{link.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex sm:flex-row  flex-col-reverse items-center sm:justify-between gap-10 min-w-max">
            <div className="flex flex-col gap-5 max-w-xs">
              <h1 className="font-semibold text-2xl">
                GET IN <span className="text-primary">TOUCH</span> WITH US
              </h1>
              <p className="text-sm text-justify">
                Subscribe to our SenWiseTool Updates newsletter to be the first
                to learn about new features, resources, and user impact stories
                from around the world.
              </p>
              <div className="flex flex-col gap-1">
                <Input
                  className="rounded-none"
                  placeholder="Enter your Email"
                />
                <span>
                  <Button size="sm" className="rounded-none">
                    Submit
                  </Button>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5 items-center">
              <div className="flex gap-2">
                <ToggleTheme />
              </div>
              <Image
                src="/images/logo2.png"
                height={123}
                width={221}
                alt="SenWiseTool logo"
              />
              <div className="flex flex-col gap-3 font-semibold text-sm">
                <span>SOCIAL MEDIA</span>
                <div className="flex items-center gap-3">
                  {socialFooterLink.map((sociaLink, index) => (
                    <Link
                      href={sociaLink.baseUrl}
                      target={
                        sociaLink.type === "external" ? "_blank" : "_self"
                      }
                    >
                      {sociaLink.icon && <sociaLink.icon />}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5 flex justify-end">
          <Language />
        </div>
      </div>
    </Container>
  );
};
