import { NextResponse } from "next/server";

// those shoudl be changed to try catch blocks

export async function GET(request, context) {
  const id = context.params.noteid;
  const monthCode = context.params.monthCode;

  const response = await fetch(
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/notes/${monthCode}/${id}.json`
  );

  const note = await response.json();

  return NextResponse.json(note, { status: 200 });
}

export async function PATCH(request, { params }) {
  const id = params.noteid;
  const monthCode = params.monthCode;

  const { title, tags, long_text, date_time_field, updated_at, folder } =
    await request.json();

  const updatedNote = {
    title,
    tags,
    long_text,
    date_time_field,
    updated_at,
    folder,
  };

  const response = await fetch(
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/notes/${monthCode}/${id}.json`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    }
  );

  const data = await response.json();

  if (data) {
    return new Response("The note was successfuly updated!");
  }

  return new Response("There was an error updating the data!");
}

export async function DELETE(request, context) {
  const id = context.params.noteid;
  const monthCode = context.params.monthCode;

  const response = await fetch(
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/notes/${monthCode}/${id}.json`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    return new Response("There was an error deleting the data!");
  }

  return new Response("The note was successfuly deleted!");
}
