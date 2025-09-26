import React, { useState } from "react"; 
import api from "./api";

function UploadForm() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setReady(false);

    if (!file1 || !file2) {
      setError("Please select both files.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file1", file1);
      formData.append("file2", file2);

      await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(true);
      const processRes = await api.post("/process");
      setLoading(false);

      if (processRes.data.status === "ready") {
        setReady(true);
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Try again.");
    }
  };

  const handleDownload = async () => {
  try {
    const res = await api.get("/download", {
      responseType: "blob",
      headers: { Accept: "application/pdf" }, // ✅ force PDF response
    });

    // res.data is already a Blob
    const url = window.URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    setError("Failed to download file.");
  }
};


  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-300 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        Upload & Process Files
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* File 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            File 1
          </label>
          <input
            type="file"
            onChange={(e) => setFile1(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-100 
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100
                       dark:file:bg-gray-700 dark:file:text-gray-100 dark:hover:file:bg-gray-600"
          />
        </div>

        {/* File 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            File 2
          </label>
          <input
            type="file"
            onChange={(e) => setFile2(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-100 
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100
                       dark:file:bg-gray-700 dark:file:text-gray-100 dark:hover:file:bg-gray-600"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 
                     text-white font-semibold rounded-lg shadow-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-400 
                     disabled:opacity-50 transition"
        >
          {loading ? "Processing..." : "Upload & Process"}
        </button>
      </form>

      {ready && (
        <button
          onClick={handleDownload}
          className="mt-5 w-full py-2 px-4 bg-green-600 hover:bg-green-700 
                     text-white font-semibold rounded-lg shadow-md 
                     focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        >
          Download File
        </button>
      )}
    </div>
  );
}

export default UploadForm;
