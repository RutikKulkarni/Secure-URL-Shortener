"use client";
import React, { useState, useEffect } from "react";
import { copyToClipboard, formatDate, API_BASE_URL } from "../utils/utils";
import UrlForm from "./Form";
import UrlResult from "./Result";
import UrlHistory from "./History";

function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const savedHistory = localStorage.getItem("urlHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("urlHistory", JSON.stringify(history));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch(`${API_BASE_URL}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL");
      }

      setShortUrl(data.shortUrl);

      const newEntry = {
        originalUrl: url,
        shortUrl: data.shortUrl,
        shortCode: data.shortCode,
        createdAt: new Date().toISOString(),
        clicks: 0,
      };

      setHistory((prev) => [newEntry, ...prev.slice(0, 9)]);
      setUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAnalytics = async (shortCode) => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/${shortCode}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics((prev) => ({
          ...prev,
          [shortCode]: data,
        }));
      }
    } catch (err) {
      console.error("Failed to get analytics:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            URL Shortener
          </h1>
          <p className="text-gray-600">
            Transform long URLs into short, shareable links
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <UrlForm
            url={url}
            setUrl={setUrl}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {shortUrl && (
            <UrlResult
              shortUrl={shortUrl}
              onCopy={() => copyToClipboard(shortUrl)}
            />
          )}
        </div>

        {history.length > 0 && (
          <UrlHistory
            history={history}
            analytics={analytics}
            onCopy={copyToClipboard}
            onGetAnalytics={getAnalytics}
            formatDate={formatDate}
          />
        )}
      </div>
    </div>
  );
}

export default UrlShortener;
