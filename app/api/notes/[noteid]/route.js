import { pullOneNote } from "@/lib/db";
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request, context) {
  const id = context.params.noteid;
  const note = await pullOneNote(id);
  return NextResponse.json(note, { status: 200 });
}

export async function PATCH(request, context) {
  const id = context.params.noteid;
  const { title, tags, long_text } = JSON.parse(
    await new Response(request.body).text()
  );

  //   await query(
  //     `UPDATE notes SET title = ${title}, tags=${tags}, long_text=${long_text} WHERE id = ${id}`,
  //     []
  //   );

  const query2 =
    "UPDATE notes SET title = ?, tags = ?, long_text = ? WHERE id = ?";
  const values = [title, tags, long_text, id];
  await query(query2, values);

  return new Response("The note was added to to the DB!");
}
