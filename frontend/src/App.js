import React from "react";
import UploadForm from "./UploadForm";
import DarkModeToggle from "./DarkModeToggle";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      {/* Centered Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <UploadForm />
        </div>
      </div>
    </div>
  );
}

export default App;
