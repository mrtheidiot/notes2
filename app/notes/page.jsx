import NotesList from './../components/NotesList/NotesList'
import AllNotesFilterBar from "../components/SearchComponents/AllNotesFilterBar";
import { getAllExistingSearchOptions } from "./../../lib/getAllExistingSearchOptions";
import { getAllNotes_convToArr } from "./../../lib/getAllNotes_convToArr";

export const revalidate = 10;

const Notes = async () => {
  const notes = await getAllNotes_convToArr();
  const searchValues = getAllExistingSearchOptions(notes);

  const content =
    notes.length > 0 ? <NotesList notes={notes} /> : <p>Loading...</p>;

  return (
    <>
      <div>
        <AllNotesFilterBar searchValues={searchValues} />
        {content}
      </div>
    </>
  );
};

export default Notes;
