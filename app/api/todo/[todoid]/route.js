import { NextResponse } from "next/server";

export async function DELETE(request, context) {
  const id = context.params.todoid;

  console.log(id)

  await fetch(
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/todolist/${id}.json`,
    {
      method: "DELETE",
    }
  );

  return NextResponse.json(
    { message: "Item successfuly deleted!" },
    { status: 200 }
  );
}
