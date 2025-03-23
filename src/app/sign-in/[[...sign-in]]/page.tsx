import { Session } from "@/components/templates/session";
import { Route } from "@/lib/route";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

import { SignIn } from "@clerk/nextjs";
type Props = {};

export default function page({}: Props) {
  return (
    <Session sessionStatus="guest">
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
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-primary border-0 hover:bg-[#f09a27] text-sm",
                cardBox: " h-fit",
              },
            }}
          />
        </div>
      </main>
    </Session>
  );
}

// export default function Page() {
//   const { signIn, isLoaded } = useSignIn();
//   const { value: isLoading, setValue: setIsLoading } = useToggle();
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isLoaded) return;

//     setIsLoading(true);
//     setErrorMessage(null);

//     const email = (e.target as any).email.value;
//     const password = (e.target as any).password.value;

//     try {
//       const response = await signIn.create({ identifier: email, password });
//       console.log("User signed in:", response);
//       toast.success("Connexion Réussie");
//       router.push(Route.dashboard);
//     } catch (error: any) {
//       toast.warning("Something is wrong");
//       console.error("Sign in failed:", error);
//       if (
//         error.message.includes(
//           "You can only be signed into one account at a time"
//         )
//       ) {
//         setErrorMessage("You are already connected");
//         router.push(Route.dashboard);
//       } else if (error.message.includes("Network error")) {
//         setErrorMessage(
//           "Connexion au serveur échouée. Vérifiez votre connexion."
//         );
//       } else setErrorMessage("Identifiants incorrects. Veuillez réessayer.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Session sessionStatus={GUEST}>
//       <div
//         className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-b from-gray-900/70 to-gray-900/90"
//         style={{
//           backgroundImage: "url('/images/image2.png')",
//         }}
//       >
//         <FaHome
//           size={65}
//           onClick={() => router.push(Route.home)}
//           title="Return to home page"
//           className="absolute top-5 left-5 z-20 flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-lg hover:shadow-black hover:text-zinc-200 transition cursor-pointer"
//         />

//         <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
//         <form
//           onSubmit={handleSignIn}
//           className="relative max-w-lg w-full bg-white/90 dark:bg-gray-800/90 p-10 rounded-lg shadow-2xl z-10 animate-fade-in"
//         >
//           {/* Logo de la compagnie */}
//           <div className="flex justify-center mb-6">
//             <img
//               src="/images/logo.png"
//               alt="Logo de la compagnie"
//               className="h-16 w-auto"
//             />
//           </div>

//           <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">
//             Bienvenue
//           </h1>

//           {errorMessage && (
//             <div
//               className="mb-6 px-4 py-3 border border-red-500 bg-red-100 text-red-700 rounded-lg flex items-center gap-3 shadow-lg animate-bounce-fade"
//               role="alert"
//             >
//               <MdError />
//               <span>{errorMessage}</span>
//             </div>
//           )}

//           <div className="relative w-full mb-6">
//             <input
//               type="email"
//               name="email"
//               placeholder=" "
//               className="peer w-full p-3 border rounded-md focus:outline-none bg-gray-50 text-gray-800 placeholder-transparent"
//               required
//             />
//             <label className="absolute left-3 -top-2 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-indigo-500 transition-all">
//               Adresse email
//             </label>
//           </div>

//           <div className="relative w-full mb-6">
//             <input
//               type="password"
//               name="password"
//               placeholder=" "
//               className="peer w-full p-3 border rounded-md focus:outline-none bg-gray-50 text-gray-800 placeholder-transparent"
//               required
//             />
//             <label className="absolute left-3 -top-2 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-indigo-500 transition-all">
//               Mot de passe
//             </label>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-3 rounded-lg text-lg font-semibold transform transition-all duration-300 ${
//               isLoading
//                 ? "bg-indigo-300 text-gray-200 cursor-not-allowed"
//                 : "bg-gradient-to-br from-black via-primary to-black text-white hover:scale-105 shadow-lg hover:shadow-2xl"
//             }`}
//           >
//             {isLoading ? "Chargement..." : "Connexion"}
//           </button>

//           {/* Lien pour mot de passe oublié et création de compte */}
//           <div className="mt-6 flex justify-between gap-5 items-center">
//             <Link
//               href={Route.signUp}
//               className="text-sm text-indigo-500 hover:underline"
//             >
//               Créer un compte
//             </Link>
//             <Link
//               href="/forgot-password"
//               className="text-sm text-red-500 hover:underline mb-2"
//             >
//               Mot de passe oublié ?
//             </Link>
//           </div>
//         </form>
//       </div>
//     </Session>
//   );
// }
