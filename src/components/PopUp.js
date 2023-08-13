import React from "react";

export default function Popup ({isOpen}) {
  const closePopup = () => {
    isOpen(false);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-dark-gray bg-opacity-50">
      <div className="bg-white bg-opacity-100 rounded px-8 py-4 z-50">
        <h2 className="text-lg font-semibold mb-4">Congratulations!</h2>
        <p>You have finished your workout. Well done!</p>
        <button onClick={closePopup} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};
