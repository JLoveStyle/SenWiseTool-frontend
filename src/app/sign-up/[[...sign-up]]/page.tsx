import { Route } from "@/lib/route";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

type Props = {};

export default function page({}: Props) {
  return (
    // <Session>
    <main
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-b from-gray-900/70 to-gray-900/90"
      style={{
        backgroundImage: "url('/images/image2.png')",
      }}
    >
      <Link href={Route.home}>
        <FaHome
          size={65}
          title="Return to home page"
          className="absolute top-5 left-5 z-20 flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-lg hover:shadow-black hover:text-zinc-200 transition cursor-pointer"
        />
      </Link>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

      <div className="md:w-1/2 w-[96%] flex justify-center mx-auto mt-10 ">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-primary border-0 hover:bg-[#f09a27] text-sm",
            },
          }}
        />
      </div>
    </main>
    // </Session>
  );
}
