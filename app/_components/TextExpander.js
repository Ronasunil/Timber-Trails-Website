"use client";

const { useState } = require("react");

export default function TextExpander({ children, wordLength }) {
  const [expandText, setExpandTest] = useState(false);

  return (
    <p
      className="text-lg text-primary-300 mb-10 cursor-pointer"
      onClick={() => setExpandTest((value) => !value)}
    >
      {!expandText
        ? `${[...children].slice(0, wordLength).join("")}...`
        : children}

      <span className="text-primary-200">
        {!expandText ? " Show more" : " Show less"}
      </span>
    </p>
  );
}
