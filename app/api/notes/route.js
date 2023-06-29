import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("inside get notes function");

  const response = await fetch(
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/notes.json`,
    {
      cache: "no-cache",
      next: {
        revalidate: 10,
      },
    }
  );

  const data = await response.json();

  let notes = [];
  for (const monthCode in data) {
    for (const id in data[monthCode]) {
      const obj = data[monthCode][id];
      obj.monthCode = monthCode;
      obj.id = id;
      notes.push(obj);
    }
  }

  return new NextResponse(JSON.stringify(notes), { status: 200 });
}
