"use client";

import CustomEditor from "@/app/components/Editor";
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";

const EditNote = () => {
  const params = useParams();
  const id = params.noteid;

  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [longText, setLongText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/notes/${id}`);
        const data = await response.json();
        setTitle(data.title);
        setTags(data.tags);
        setLongText(data.long_text);
        console.log(longText)
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
    fetchData();
  }, [id, longText]);

  const onEditNoteHandler = async () => {
    const values = {
      title,
      tags,
      long_text: editorRef.current.getContent(),
    };

    try {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      // const data = await JSON.parse(response);

      //   if (data) console.log(data);
    } catch (err) {
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
      <CustomEditor longText={longText} ref={editorRef} />
      <button type="button" onClick={onEditNoteHandler}>
        Add Note
      </button>
    </div>
  );
};

export default EditNote;
