"use client";

// import { useTheme } from "next-themes";

export function ToggleTheme() {
  // const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex justify-between items-center gap-10">
        <label className="ui-switch">
          <input
            type="checkbox"
            onClick={() => {
              // setTheme(theme == "dark" ? "light" : "dark");
            }}
            // checked={theme === "dark" ? true : false}
          />
          <div className="slider bg-white dark:bg-primary">
            <div className="circle bg-slate-400"></div>
          </div>
        </label>
        <span className="sr-only">Toggle theme</span>
      </div>
    </>
  );
}
