/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const UploadProductModal = ({ progress, isUploading, progress_word }: any) => {
  if (!isUploading) return null;
  return (
    <>
      <div
        className={` fixed top-0 left-0 z-[100] bg-black flex justify-center items-center bg-opacity-70 w-full h-[100vh] `}
      >
        <div className="bg-white rounded-[20px] gap-4 h-[20rem] max-h-[80vh] justify-center items-center w-[35rem] max-w-[90%] flex flex-col">
          <div className="w-[80%]  h-[3rem] flex  border border-green-200">
            <div
              style={{
                width: `${progress}%`,
                transition: "0.4s linear",
              }}
              className="bg-green-200"
            ></div>
          </div>
          <p>Uploading {progress_word}</p>
        </div>
      </div>
    </>
  );
};

export default UploadProductModal;
