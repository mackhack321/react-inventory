import React, { useState } from "react";

export default function PowerBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm != "") {
      console.log("search " + searchTerm);
    }
  };

  return (
    <div className="bg-white rounded-lg mb-5 min-w-full">
      <div className="flex flex-row space-x-3 p-3">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter a search term"
            className="border-2 rounded-md px-2"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
        <div>
          <button className="bg-green-300 rounded-md px-3 h-full hover:bg-green-500">
            Create Item
          </button>
        </div>
      </div>
    </div>
  );
}
