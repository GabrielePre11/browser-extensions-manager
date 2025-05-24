//================= HOOKS & ICONS =================//
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.svg";
import iconMoon from "../assets/images/icon-moon.svg";
import iconSun from "../assets/images/icon-sun.svg";

//================= HEADER COMPONENT =================//
const Header = () => {
  // State which toggles the iconSun and iconMoon icons and (dark/light theme)
  const [isDark, setIsDark] = useState<boolean>(false);

  //================= toggleTheme COMPONENT =================//
  /*
  - It toggles the theme, so if it's light it turns dark, and viceversa
  - It saves the theme chosed by the user to the localStorage
  */
  const toggleTheme = () => {
    setIsDark((prev) => {
      const theme = !prev;
      document.body.classList.toggle("dark", theme);
      localStorage.setItem("theme", theme ? "dark" : "light");
      return theme;
    });
  };

  //================= useEffect to get and load the THEME =================//
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDark(true);
      document.body.classList.add("dark");
    } else {
      setIsDark(false);
      document.body.classList.remove("dark");
    }
  }, []);

  return (
    <header className="py-7">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="flex items-center justify-between bg-neutral-0 dark:bg-neutral-600/50 px-2 py-1.5 rounded-lg shadow shadow-neutral-300 dark:shadow-transparent">
          {/*================= LOGO =================*/}
          <a href="/" aria-label="logo">
            <img src={logo} alt="logo" width={150} />
          </a>

          {/*================= TOGGLE THEME BUTTON =================*/}
          <button onClick={toggleTheme}>
            <img
              src={isDark ? iconSun : iconMoon}
              alt="Theme Toggle"
              className="bg-neutral-600 p-1.5 rounded-lg w-8 transition-colors duration-200 hover:bg-neutral-600/70"
              role="theme-toggler"
              aria-label="Theme Toggle"
              aria-live="polite"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
