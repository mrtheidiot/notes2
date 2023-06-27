"use client";

import CustomEditor from "@/app/components/Editor";
import React, { useRef, useState } from "react";

const AddNewNote = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const onAddNewNoteHandler = async () => {
    const values = {
      title,
      tags,
      long_text: editorRef.current.getContent(),
    };

    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

    //   const data = await JSON.parse(response);

    //   if (data) console.log(data);
    } catch (err) {
      //   throw new Error({ message: "Could not sent the new note data!" });
      //   throw new Error(err);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <label htmlFor="title">Title: </label>
      <input
        id="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="bg-yellow-800"
      />
      <label htmlFor="tags">Tags: </label>
      <input
        id="tags"
        type="text"
        onChange={(e) => setTags(e.target.value)}
        value={tags}
        className="bg-yellow-800"
      />
      <CustomEditor ref={editorRef} />
      <button type="button" onClick={onAddNewNoteHandler}>
        Add Note
      </button>
    </div>
  );
};

export default AddNewNote;
