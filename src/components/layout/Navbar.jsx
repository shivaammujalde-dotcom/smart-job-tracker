import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {

  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className="h-16 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center px-8">
      
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
        Dashboard
      </h2>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

    </div>
  );
}