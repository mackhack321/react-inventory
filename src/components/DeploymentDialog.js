import React from "react";
import { useState } from "react";

export default function DeploymentDialog(props) {
  const [deployment, setDeployment] = useState("");
  return (
    <div className="bg-white rounded-lg mb-5 sm:w-2/3 lg:w-1/3 self-center">
      <div className="p-3 space-y-3">
        <div>
          <div>New deployment for "{props.item.name}"</div>
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
        <div className="space-x-3">
          <button
            className="bg-green-300 rounded-md px-3 h-full hover:bg-green-500"
            onClick={() =>
              props.onSubmit({ id: props.item.id, deployment: deployment })
            }
          >
            Submit
          </button>
          <button
            className="bg-red-300 rounded-md px-3 h-full hover:bg-red-500"
            onClick={() => props.onSubmit({})}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
