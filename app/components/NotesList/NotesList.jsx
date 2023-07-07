import Link from "next/link";
import { formatDateToYYYYMMDD } from "../../../lib/formatDateToYYYYMMDD";

const NotesList = ({ notes }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Updated At
          </th>
          <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 text-black">
        {notes.map((note, index) => (
          <tr key={index}>
            <td className="px-3 py-2 whitespace-nowrap hover:cursor-pointer hover:opacity-40">
              {note.title}
            </td>
            <td className="px-3 py-2 whitespace-nowrap text-center">
              {formatDateToYYYYMMDD(note.updated_at)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap space-x-2 text-center">
              <Link
                className="hover:underline"
                href={`/notes/edit/${note.monthCode}/${note.id}`}
              >
                Edit
              </Link>
              <Link
                className="hover:underline"
                href={`/notes/view/${note.monthCode}/${note.id}`}
              >
                View
              </Link>
              <button className="hover:underline" type="button">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NotesList;
