"use client";

// import CustomEditor from "@/app/components/Editor";
import CustomEditor from "../../components/Editor";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const AddNewNote = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter()

  const onAddNewNoteHandler = async () => {
    const values = {
      title,
      tags,
      long_text: editorRef.current.getContent(),
    };

    try {
      const response = await fetch('/api/notes', {
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

  const onCancelChanges = () => {
    router.push('/notes')
  }

  return (
    <div className="flex flex-col space-y-3">
      <label htmlFor="title">Title: </label>
      <input
        id="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="bg-slate-500  px-3 py-1"
      />
      <label htmlFor="tags">Tags: </label>
      <input
        id="tags"
        type="text"
        onChange={(e) => setTags(e.target.value)}
        value={tags}
        className="bg-slate-500  px-3 py-1"
      />
      <CustomEditor ref={editorRef} />
      <div className="flex w-full justify-around">
      <button 
        className="p-2 bg-slate-500 text-white rounded shadow-md hover:bg-slate-600 transition-all duration-200 transform active:scale-90 w-5/12"
        type="button"
        onClick={onCancelChanges}
      >
        Cancel
      </button>
      <button
        className="p-2 bg-slate-500 text-white rounded shadow-md hover:bg-slate-600 transition-all duration-200 transform active:scale-90 w-5/12"
        type="button"
        onClick={onAddNewNoteHandler}
      >
        Add Note
      </button>
      </div>
    </div>
  );
};

export default AddNewNote;
