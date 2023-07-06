"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'

const AllNotesFilterBar = ({ searchValues }) => {
  const { monthCodes, folders, created_ats, updated_ats } = searchValues;
  const router = useRouter();

  const [formState, setFormState] = useState({
    monthCode: "all",
    folder: "all",
    created_at: "",
    updated_at: "",
  });

  const updateFormState = (key, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onSearchNotesHandler = () => {
    const selectedCreatedAt =
      formState.created_at === "" ? "all" : formState.created_at;
    const selectedUpdatedAt =
      formState.updated_at === "" ? "all" : formState.updated_at;

    const queryPath = `monthCode=${formState.monthCode}&folder=${formState.folder}&created_at=${selectedCreatedAt}&updated_at=${selectedUpdatedAt}`;
    router.push(`/notes/search?${queryPath}`);
  };
  return (
    <>
      <div className="flex w-full h-22 text-white bg-gray-800">
        <div className="space-x-4 flex h-full w-full p-4 items-center">
          <label className="w-1/5">
            <span>Month Code</span>
            <select
              className="w-full p-2 border-gray-700 rounded text-black"
              value={formState.monthCode}
              onChange={(e) => updateFormState("monthCode", e.target.value)}
            >
              <option value="all">All</option>
              {monthCodes.map((monthCode) => (
                <option key={monthCode} value={monthCode}>
                  {monthCode}
                </option>
              ))}
            </select>
          </label>

          <label className="w-1/5">
            <span>Folder</span>
            <select
              className="w-full p-2 border-gray-700 rounded text-black"
              value={formState.folder}
              onChange={(e) => updateFormState("folder", e.target.value)}
            >
              <option value="all">All</option>
              {folders.map((folder) => (
                <option key={folder} value={folder}>
                  {folder}
                </option>
              ))}
            </select>
          </label>

          <label className="w-1/5">
            <span>Created At</span>
            <input
              className="w-full p-2 border-gray-700 rounded text-black"
              type="date"
              value={formState.created_at}
              onChange={(e) => updateFormState("created_at", e.target.value)}
            />
          </label>

          <label className="w-1/5">
            <span>Updated At</span>
            <input
              className="w-full p-2 border-gray-700 rounded text-black"
              type="date"
              value={formState.updated_at}
              onChange={(e) => updateFormState("updated_at", e.target.value)}
            />
          </label>

          <button
            className="w-1/5 p-2 bg-blue-500 text-white rounded"
            onClick={onSearchNotesHandler}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default AllNotesFilterBar;
