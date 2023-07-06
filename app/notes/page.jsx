import NotesList from "./NotesList";
import AllNotesFilterBar from "./AllNotesFilterBar";
import {
  getAllExistingSearchOptions,
  getAllNotes,
} from "./../../lib/fetchDataFunctions/fetchFunctions";

export const revalidate = 10;

const Notes = async () => {
  const notes = await getAllNotes();
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
