"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  function parseDate(dateString) {
    const dateObject = new Date(dateString);
    return dateObject.toDateString();
  }

  useEffect(() => {
    console.log("useEffect running");

    const fetchData = async () => {
      const response = await fetch(`/api/notes`, {
        cache: "no-store",
        next: {
          revalidate: 10,
        },
      });
      const data = await response.json();

      console.log(data);

      setNotes(data);
    };
    fetchData();
  }, []);

  const content =
    notes.length > 0 ? (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
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
          {notes.map((note, index) => (
            <tr key={index}>
              <td className="px-3 py-2 whitespace-nowrap">{note.title}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                {parseDate(note.created_at)}
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                {parseDate(note.updated_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/notes/edit/${note.monthCode}/${note.id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>Loadig...</p>
    );

  return content;
};

export default Notes;
