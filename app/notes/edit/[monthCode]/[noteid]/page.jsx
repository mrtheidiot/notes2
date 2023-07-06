import EditForm from "./EditForm";
import {
  getAllExistingSearchOptions,
  getAllNotes,
} from "../../../../../lib/fetchDataFunctions/fetchFunctions";

export const revalidate = 0;

const EditNote = async ({ params }) => {
  const notes = await getAllNotes();
  const searchValues = getAllExistingSearchOptions(notes);

  const note = notes.find(
    (note) => note.monthCode === params.monthCode && note.id === params.noteid
  );

  return <EditForm data={note} folders={searchValues.folders} />;
};

export default EditNote;
