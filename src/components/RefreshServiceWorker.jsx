import React, { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

const RefreshServiceWorker = () => {
  const { needRefresh, updateServiceWorker } = useRegisterSW();

  const [showReload, setShowReload] = useState(false);

  useEffect(() => {
    if (needRefresh) {
      setShowReload(true);
    }
  }, [needRefresh]);

  const closePopup = () => {
    setShowReload(false);
  };

  const reloadPage = () => {
    updateServiceWorker(true);
    setShowReload(false);
  };

  if (!showReload) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded shadow-lg">
        <h2 className="text-lg font-bold">New Update Available</h2>
        <p className="mb-4">
          There is a new version of the application available. Please refresh to
          update.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
            onClick={closePopup}
          >
            Dismiss
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={reloadPage}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefreshServiceWorker;
