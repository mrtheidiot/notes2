import NotesList from "./../../components/NotesList/NotesList";
import { formatDateToYYYYMMDD } from "../../../lib/formatDateToYYYYMMDD";
import AllNotesFilterBar from "../../components/SearchComponents/AllNotesFilterBar";
import { getAllExistingSearchOptions } from "../../../lib/getAllExistingSearchOptions"

const Search = async ({ searchParams }) => {
  const { monthCode, created_at, updated_at, folder } = searchParams;

  const response = await fetch(
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/notes.json`
  );
  const data = await response.json();

  let allNotes = [];
  for (const monthCode in data) {
    for (const id in data[monthCode]) {
      const obj = data[monthCode][id];
      obj.monthCode = monthCode;
      obj.id = id;
      allNotes.push(obj);
    }
  }

  const filteredNotes = allNotes.filter(
    (note) =>
      (created_at === "all"
        ? true
        : formatDateToYYYYMMDD(note.created_at) === created_at) &&
      (updated_at === "all"
        ? true
        : formatDateToYYYYMMDD(note.updated_at) === updated_at) &&
      (monthCode === "all" ? true : note.monthCode === monthCode) &&
      (folder === "all" ? true : note.folder === folder)
  );

  const searchValues = getAllExistingSearchOptions(allNotes);

  return (
    <>
      <AllNotesFilterBar searchValues={searchValues} />
      <NotesList notes={filteredNotes} />
    </>
  );
};

export default Search;
