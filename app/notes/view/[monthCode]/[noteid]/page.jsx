import React from "react";
import { getAllNotes_convToArr } from "./../../../../../lib/getAllNotes_convToArr";

export const revalidate = 60;

export async function generateStaticParams() {
  const notes = await getAllNotes_convToArr();

  return notes.map((note) => ({
    noteId: note.id,
  }));
}

const Note = async ({ params }) => {
  const response = await fetch(
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/notes/${params.monthCode}/${params.noteid}.json`
  );

  const note = await response.json();

  const {
    active,
    created_at,
    date_time_field,
    folder,
    tags,
    title,
    updated_at,
    userId,
    long_text,
  } = note;

  return (
    <main>
      <div className="w-full flex flex-wrap items-start justify-start p-4 bg-gray-800 text-white rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-2 w-full">{title}</h1>
        <div className="text-lg mb-2 mr-4">Active: {active ? "Yes" : "No"}</div>
        <div className="text-lg mb-2 mr-4">Created At: {created_at}</div>
        <div className="text-lg mb-2 mr-4">Date Time: {date_time_field}</div>
        <div className="text-lg mb-2 mr-4">Folder: {folder}</div>
        <div className="text-lg mb-2 mr-4">Tags: {tags}</div>
        <div className="text-lg mb-2 mr-4">Updated At: {updated_at}</div>
        <div className="text-lg mb-2 mr-4">User ID: {userId}</div>
      </div>
      <div
        className="p-5"
        dangerouslySetInnerHTML={{ __html: long_text }}
      ></div>
    </main>
  );
};

export default Note;
