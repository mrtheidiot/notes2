import { NextResponse } from "next/server";

export async function POST(req) {
  let text = JSON.parse(await new Response(req.body).text()); //temp
  const { title, tags, long_text } = text;

  let userId = 1;

  const date = new Date();
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");

  let monthCode = `${month}-${year}`;

  const newNote = {
    title,
    tags,
    long_text,
    created_at: date,
    updated_at: date,
    active: true,
    userId,
    date_time_field: date,
  };

  const response = await fetch(
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/notes/${monthCode}.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "appication/json",
      },
      body: JSON.stringify(newNote),
    }
  );

  const id = await response.json();
  const noteId = id.name;

  return new NextResponse(noteId, { status: 200 });
}
