import { NextResponse } from "next/server";

export async function DELETE(request, context) {
  const id = context.params.todoid;

  await fetch(
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/todolist/${id}.json`,
    {
      method: "DELETE",
    }
  );

  return new NextResponse(
    { message: "Item successfuly deleted!" },
    { status: 200 }
  );
}

export async function PATCH(request, { params }) {
  const id = params.todoid;
  const data = await request.json();

  const response = await fetch(
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/todolist/${id}.json`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (response.ok) {
    return NextResponse.json({ message: "Todo updated succesfully!" });
  } else {
    return new NextResponse(
      { message: "There was an error updating the todo item" },
      { status: 400, statusText: "Bad request chuju" }
    );
  }
}
