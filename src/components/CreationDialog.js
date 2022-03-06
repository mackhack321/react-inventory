import React from "react";
import { useState } from "react";

export default function CreationDialog(props) {
  const [name, setName] = useState("");
  const [deployment, setDeployment] = useState("");
  return (
    <div className="bg-white rounded-lg mb-5 sm:w-2/3 lg:w-1/3 self-center">
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
            />
          </div>
        </div>
        <button
          className="bg-green-300 rounded-md px-3 h-full hover:bg-green-500"
          onClick={() => props.onSubmit({ name: name, deployment: deployment })}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
