"use client";

// import CustomEditor from "@/app/components/Editor";
import CustomEditor from "../../../components/Editor";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Suspense,
} from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { formatDate } from "../../../../lib/formatedDate";

const EditNote = () => {
  const params = useParams();
  const id = params.noteid;

  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [longText, setLongText] = useState("");
  const [date, setDate] = useState("");

  const router = useRouter();

  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }

  const formatDateForInput = (dateISO) => {
    // let dateStr = "2023-06-26T15:20:00.000Z"; // ISO format date string
    let date = new Date(dateISO);

    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/notes/${id}`);
        const data = await response.json();
        setTitle(data.title);
        setTags(data.tags);
        setLongText(data.long_text);
        setDate(() => formatDateForInput(data.date_time_field));
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const onEditNoteHandler = useCallback(async () => {
    const formatedDate = formatDate(new Date(date));

    const values = {
      title,
      tags,
      long_text: editorRef.current.getContent(),
      date_time_field: formatedDate,
    };

    console.log(values.title);

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch (err) {
      console.log(err);
    }
  }, [title, tags, date, id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      onEditNoteHandler();
      console.log("Saving...");
    }, 10000);
    return () => clearInterval(intervalId);
  }, [onEditNoteHandler]); // Pass an empty array as the second argument to run the effect once when the component mounts

  const onCancelChanges = () => {
    router.push("/notes");
  };

  const onSaveChangesHandler = async () => {
    await onEditNoteHandler().then((res) => router.push("/notes"));
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-even space-x-5 mt-3">
        <span>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="bg-slate-500 px-3 py-1"
          />
        </span>
        <span>
          <label htmlFor="tags">Tags: </label>
          <input
            id="tags"
            type="text"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            className="bg-slate-500 px-3 py-1"
          />
        </span>
        <span>
          <label htmlFor="date">Date: </label>
          <input
            id="date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            className="bg-slate-500 px-3 py-1"
          />
        </span>
      </div>
      <Suspense fallback={<Loading />}>
        <CustomEditor longText={longText} ref={editorRef} />
      </Suspense>
      <div className="flex w-full justify-around">
        <button
          className="p-2 bg-slate-500 text-white rounded shadow-md hover:bg-slate-600 transition-all duration-200 transform active:scale-90 w-5/12"
          type="button"
          onClick={onCancelChanges}
        >
          Cancel Changes
        </button>
        <button
          className="p-2 bg-slate-500 text-white rounded shadow-md hover:bg-slate-600 transition-all duration-200 transform active:scale-90 w-5/12"
          type="button"
          onClick={onSaveChangesHandler}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditNote;
