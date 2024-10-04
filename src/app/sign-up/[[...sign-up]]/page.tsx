import { Session } from "@/components/templates/session";
import { SignUp } from "@clerk/nextjs";

type Props = {};

export default function page({}: Props) {
  return (
    <Session>
      <main className="">
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
    </Session>
  );
}
