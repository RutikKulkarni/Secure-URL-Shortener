import React from "react";

function UrlHistoryItem({
  item,
  analytics,
  onCopy,
  onGetAnalytics,
  formatDate,
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 mb-1">Original URL:</p>
          <p className="text-gray-900 truncate mb-2">{item.originalUrl}</p>
          <p className="text-sm text-gray-500 mb-1">Short URL:</p>
          <div className="flex items-center space-x-2">
            <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm">
              {item.shortUrl}
            </code>
            <button
              onClick={() => onCopy(item.shortUrl)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:items-end space-y-2">
          <p className="text-xs text-gray-500">
            Created: {formatDate(item.createdAt)}
          </p>
          <button
            onClick={onGetAnalytics}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors"
          >
            View Analytics
          </button>
          {analytics && (
            <div className="text-sm bg-blue-50 p-2 rounded">
              <p className="text-blue-700">Clicks: {analytics.totalClicks}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UrlHistoryItem;
