import EditForm from "../../../../components/EditComponents/EditForm";
import { getAllExistingSearchOptions } from "../../../../../lib/getAllExistingSearchOptions";
import { getAllNotes_convToArr } from "../../../../../lib/getAllNotes_convToArr";

export const revalidate = 0;

const EditNote = async ({ params }) => {
  const notes = await getAllNotes_convToArr();
  const searchValues = getAllExistingSearchOptions(notes);

  const note = notes.find(
    (note) => note.monthCode === params.monthCode && note.id === params.noteid
  );

  return <EditForm data={note} folders={searchValues.folders} />;
};

export default EditNote;
