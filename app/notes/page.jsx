import React from "react";
// import { query } from "@/lib/db";
import { query } from "../../lib/db";
// import { getNotes_IdTitleCreatedUpdated } from "@/lib/sqlQueries";
import { getNotes_IdTitleCreatedUpdated } from "../../lib/sqlQueries";

import Link from "next/link";

const Notes = async () => {
  const notes = await query(getNotes_IdTitleCreatedUpdated);
  // console.log(notes[0]);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Created At
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Updated At
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 text-black">
        {notes[0].map((note, index) => (
          <tr key={index}>
            <td className="px-3 py-2 whitespace-nowrap">{note.id}</td>
            <td className="px-3 py-2 whitespace-nowrap">{note.title}</td>
            <td className="px-3 py-2 whitespace-nowrap">
              {note.created_at.toLocaleDateString()}
            </td>
            <td className="px-3 py-2 whitespace-nowrap">
              {note.updated_at.toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Link href={`/notes/edit/${note.id}`} >
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Notes;
