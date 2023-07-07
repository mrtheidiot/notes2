"use client";

import CustomEditor from "../EditorTinyMCE/Editor";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Suspense,
} from "react";
import { useRouter } from "next/navigation";
import { formatDateToYYYYMMDD } from "../../../lib/formatDateToYYYYMMDD";

const EditForm = ({ data, folders }) => {
  const {
    title,
    tags,
    long_text: longText,
    date_time_field: date,
    monthCode,
    id,
    folder,
  } = data;

  const editorRef = useRef(null);

  const [newTitle, setTitle] = useState(title);
  const [newTags, setTags] = useState(tags);
  const [newDate, setDate] = useState(date);
  const [newFolder, setFolder] = useState(folder ? folder : "General");

  const router = useRouter();

  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }

  const onEditNoteHandler = useCallback(async () => {
    try {
      const response = await fetch(`/api/notes/${monthCode}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          tags: newTags,
          long_text: editorRef.current.getContent(),
          date_time_field: formatDateToYYYYMMDD(new Date(newDate)),
          folder: newFolder,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  }, [newTitle, newTags, newFolder, monthCode, newDate, id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      onEditNoteHandler();
      console.log("Saving...");
    }, 10000);
    return () => clearInterval(intervalId);
  }, [onEditNoteHandler]);

  const onCancelChangesHandler = () => {
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
            value={newTitle}
            className="bg-slate-500 px-3 py-1"
          />
        </span>
        <span>
          <label htmlFor="tags">Tags: </label>
          <input
            id="tags"
            type="text"
            onChange={(e) => setTags(e.target.value)}
            value={newTags}
            className="bg-slate-500 px-3 py-1"
          />
        </span>
        <span>
          <label htmlFor="date">Date: </label>
          <input
            id="date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={newDate}
            className="bg-slate-500 px-3 py-1"
          />
        </span>
        <label className="">
          <span>Folder</span>
          <select
            className="bg-slate-500 px-3 py-1"
            value={newFolder}
            onChange={(e) => setFolder(e.target.value)}
          >
            {folders.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Suspense fallback={<Loading />}>
        <CustomEditor longText={longText} ref={editorRef} />
      </Suspense>
      <div className="flex w-full justify-around">
        <button
          className="p-2 bg-slate-500 text-white rounded shadow-md hover:bg-slate-600 transition-all duration-200 transform active:scale-90 w-5/12"
          type="button"
          onClick={onCancelChangesHandler}
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

export default EditForm;
