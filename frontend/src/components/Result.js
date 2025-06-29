import React from "react";

function UrlResult({ shortUrl, onCopy }) {
  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-green-800 font-medium mb-2">
        Success! Your short URL:
      </h3>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={shortUrl}
          readOnly
          className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-green-700 focus:outline-none"
        />
        <button
          onClick={onCopy}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Copy
        </button>
      </div>
    </div>
  );
}

export default UrlResult;
