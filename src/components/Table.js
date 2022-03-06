/*
  TODO:
  - sort
  - get item by ID
*/

import React, { useEffect, useState } from "react";
import createItem from "../util/CreateItem";
import deleteEntry from "../util/DeleteEntry";
import deploy from "../util/Deploy";
import getAllEntries from "../util/GetAllEntries";
import search from "../util/Search";
import CreationDialog from "./CreationDialog";
import DeploymentDialog from "./DeploymentDialog";
import LoadingGraphic from "./LoadingGraphic";

export default function Table() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreationDialog, setShowCreationDialog] = useState(false);
  const [showDeployDialog, setShowDeployDialog] = useState(false);
  const [deploymentItem, setDeploymentItem] = useState({});

  const handleSearchChange = async (searchTerm) => {
    console.log("search " + searchTerm);
    setData(await search(searchTerm));
  };

  const clearSearch = (e) => {
    if (e.key === "Escape") {
      e.target.value = "";
      handleSearchChange("");
    }
  };

  function deploymentHelper(id, name) {
    setDeploymentItem({ id: id, name: name });
    setShowDeployDialog(true);
  }

  async function handleDeploy(data) {
    console.log(data);
    if (Object.keys(data).length === 0) {
      setShowDeployDialog(false);
    } else {
      setShowDeployDialog(false);
      await deploy(data);
      setData(await getAllEntries());
    }
  }

  async function handleCreate(data) {
    if (Object.keys(data).length === 0) {
      setShowCreationDialog(false);
    } else {
      setLoading(true);
      setShowCreationDialog(false);
      await createItem(data);
      setData(await getAllEntries());
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setLoading(true);
    await deleteEntry(id);
    setData(await getAllEntries());
    setLoading(false);
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
      <div className="bg-white rounded-lg mb-5 sm:w-2/3 lg:w-1/3 self-center">
        <div className="text-center text-2xl pt-3 text-black font-mono">
          Mack's Inventory System
        </div>
        <div className="flex flex-row space-x-3 p-3">
          <div className="flex w-full">
            <button
              className="bg-green-300 rounded-md px-3 h-full hover:bg-green-500"
              onClick={() => setShowCreationDialog(true)}
            >
              Create Item
            </button>
          </div>
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
              onKeyDown={(e) => clearSearch(e)}
            />
          </div>
        </div>
      </div>
      {/* Powerbar ends here */}
      {showCreationDialog && <CreationDialog onSubmit={handleCreate} />}
      {showDeployDialog && (
        <DeploymentDialog onSubmit={handleDeploy} item={deploymentItem} />
      )}
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          {loading ? (
            <LoadingGraphic />
          ) : (
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
                        <div className="text-sm text-gray-900">
                          {entry.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <div className="text-sm text-gray-900">
                            {entry.deployment}
                          </div>
                          <button
                            onClick={() =>
                              deploymentHelper(entry.id, entry.name)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 stroke-slate-600 hover:stroke-slate-800"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(entry.created + "-0600").toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(entry.updated + "-0600").toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
