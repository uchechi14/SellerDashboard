/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
// import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const TextEditor = ({ placeholder, value, setfunc }: any) => {
  const [content, setContent] = useState("");

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    // "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = ({ newContent }: any) => {
    setContent(newContent);
  };
  return (
    <>
      <ReactQuill
        // value={content}
        // onChange={handleEditorChange}
        onChange={(e) => setfunc(e)}
        modules={quillModules}
        formats={quillFormats}
        placeholder={placeholder}
        value={value}
        className="w-full h-[10rem] mb-[4rem] bg-white mt-1"
      />
    </>
  );
};

export default TextEditor;
