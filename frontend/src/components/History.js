import React from "react";
import UrlHistoryItem from "./HistoryItem";

function UrlHistory({
  history,
  analytics,
  onCopy,
  onGetAnalytics,
  formatDate,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent URLs</h2>
      <div className="space-y-4">
        {history.map((item, index) => (
          <UrlHistoryItem
            key={index}
            item={item}
            analytics={analytics[item.shortCode]}
            onCopy={onCopy}
            onGetAnalytics={() => onGetAnalytics(item.shortCode)}
            formatDate={formatDate}
          />
        ))}
      </div>
    </div>
  );
}

export default UrlHistory;
