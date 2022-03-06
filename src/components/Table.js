/*
  TODO:
  - move create item button to right
  - edit functionality
  - sort
*/

import React, { useEffect, useState } from "react";
import deleteEntry from "../util/DeleteEntry";
import getAllEntries from "../util/GetAllEntries";
import search from "../util/Search";

export default function Table() {
  const [data, setData] = useState([]);

  const handleSearchChange = async (searchTerm) => {
    console.log("search " + searchTerm);
    setData(await search(searchTerm));
  };

  function handleEdit(id) {
    console.log("hello from id " + id);
  }

  async function handleDelete(id) {
    await deleteEntry(id);
    setData(await getAllEntries());
  }

  useEffect(() => {
    async function updateTable() {
      const entries = await getAllEntries();
      console.log(entries);
      setData(entries);
    }

    updateTable();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Powerbar begins here */}
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
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="">
            <button className="bg-green-300 rounded-md px-3 h-full hover:bg-green-500">
              Create Item
            </button>
          </div>
        </div>
      </div>
      {/* Powerbar ends here */}
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div>Name</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Deployment Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Updated
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{entry.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {entry.deployment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(entry.updated + "-0600").toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(entry.updated + "-0600").toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <div className="space-x-5">
                        <button
                          onClick={() => handleEdit(entry.id)}
                          className="text-indigo-600 hover:text-indigo-900 font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-500 hover:text-red-700 font-bold px-3"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
