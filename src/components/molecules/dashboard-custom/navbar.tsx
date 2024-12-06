import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-light dark:bg-dark shadow-md">
      <h1 className="text-lg font-bold text-gray-800 dark:text-white">
        My App
      </h1>
      <ThemeToggle />
    </div>
  );
};
