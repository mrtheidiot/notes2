import { NextResponse } from "next/server";
import { monthCode } from "../../../../lib/monthCode";

export async function POST(req) {
  const { title, tags, long_text } = await req.json();

  if (!title || !long_text) {
    return NextResponse.json({ message: "Title and Long_Text are required!" });
  }

  const userId = 1;
  const date = new Date();
  const currentMonthCode = monthCode(new Date());

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
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/notes/${currentMonthCode}.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "appication/json",
      },
      body: JSON.stringify(newNote),
    }
  );

  const { name } = await response.json();

  return NextResponse.json(name);
}
