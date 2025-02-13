"use client";

import { useEffect } from "react";
// import { Helvetica_light, Helvetica_medium } from "../utils/font";

const Toast_modal = ({
  id,
  message,
  onClose,
}: {
  id: string;
  message: string;
  onClose: (id: string) => void;
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose(id); // Close the toast after 3 seconds
    }, 2000);

    return () => clearTimeout(timeout); // Cleanup the timeout
  }, [id, onClose]);

  return (
    <div
      className={`  bg-gray-800 text-white px-4 py-2 rounded shadow-md flex animate-slide-in z-[10001]`}
    >
      <div className="flex items-center text-sm justify-between">
        <span>{message}</span>
        <button
          onClick={() => onClose(id)} // Close the toast manually
          className="ml-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast_modal;