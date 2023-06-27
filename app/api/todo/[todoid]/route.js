import { query } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const id = context.params.todoid;

  console.log(id)

  const queryText = `DELETE FROM ToDoList WHERE item_id = ${id};`;
  const values2 = [];

  await query(queryText, values2);

  return NextResponse.json(
    { message: "Item successfuly deleted!" },
    { status: 200 }
  );
}
