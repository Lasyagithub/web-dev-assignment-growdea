import React, { useEffect, useState } from "react";

function DarkModeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="absolute top-4 right-4 px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow hover:scale-105 transition"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

export default DarkModeToggle;
