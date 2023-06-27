// import { query } from "@/lib/db";
// import { addNoteToDb } from "@/lib/db";
import { addNoteToDb } from "../../../lib/db";
// import { formatDate } from "@/lib/formatedDate";
import { formatDate } from "../../../lib/formatedDate";

export async function GET(req) {
  return new Response("Hello, Next.js!");
}

export async function POST(req) {
  let text = JSON.parse(await new Response(req.body).text()); //temp

  const { title, tags, long_text } = text;

  const date_time_field = text.date_time_field
    ? formatDate(text.date_time_field)
    : formatDate(new Date());

  const values = { title, tags, long_text, date_time_field };
  addNoteToDb(values);

  return new Response("The note was added to to the DB!");
}

// INSERT INTO notes (title, tags, long_text, active, created_by, date_time_field)
// VALUES ('Study for test', 'study, test', 'Study for the math test coming up next week.', 1, 'John Doe', '2023-06-27 08:00:00');

// export async function GET(req) {
//   const { id } = JSON.parse(await new Response(req.body).text());
// }

// export async function PATCH(req) {
//   let text = JSON.parse(await new Response(req.body).text()); //temp
//   //   addNoteToDb(text)

//   const { title, tags, long_text } = text;

//   //   const date_time_field = text.date_time_field
//   //     ? values.date_time_field
//   //     : new Date().toString();

//   // await query({
//   //   query:
//   //     "INSERT INTO notes (title, tags, long_text, active, created_by, date_time_field) VALUES (?, ?, ?, ?, ?, ?)",
//   //   values: [title, tags, long_text, "1", "Piotr", date_time_field],
//   // });
//   //   await query({
//   //     query:
//   //       "INSERT INTO notes (title, tags, long_text, active, created_by, date_time_field) VALUES (?, ?, ?, ?, ?, ?)",
//   //     values: ['Study for test', 'study, test', 'Study for the math test coming up next week.', 1, 'John Doe', '2023-06-27 08:00:00'],
//   //   });

//   return new Response("The note was added to to the DB!");
// }
