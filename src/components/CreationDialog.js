import React from "react";
import { useState } from "react";

export default function CreationDialog(props) {
  const [name, setName] = useState("");
  const [deployment, setDeployment] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    props.sendData({ name: name, deployment: deployment });
  }

  return (
    <div className="bg-white rounded-lg mb-5 sm:w-2/3 lg:w-1/3 self-center">
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="p-3 space-y-3">
          <div>
            <div>Name</div>
            <div className="flex flex-col">
              <input
                type="text"
                name="name"
                id="name"
                className="border-2 rounded-md px-2"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div>Deployment</div>
            <div className="flex flex-col">
              <input
                type="text"
                name="deployment"
                id="deployment"
                className="border-2 rounded-md px-2"
                onChange={(e) => setDeployment(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-x-3">
            <button
              className="bg-green-300 rounded-md px-3 h-full hover:bg-green-500"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-red-300 rounded-md px-3 h-full hover:bg-red-500"
              onClick={() => props.sendData({})}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
