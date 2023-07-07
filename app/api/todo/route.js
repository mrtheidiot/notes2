import { NextResponse } from "next/server";

export async function GET(req) {
  const response = await fetch(
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/todolist.json`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  let items = [];
  for (let item in data) {
    let obj = data[item];
    obj.id = item;

    items.push(obj);
  }

  return NextResponse.json(items, { status: 200 });
}

export async function POST(req) {
  let text = JSON.parse(await new Response(req.body).text()); //temp

  const newDate = text.due_date ? text.due_date : new Date();
  const newPriority = text.priority ? text.priority : "Low";
  const newStatus = text.status ? text.status : "Pending";

  const { title, details } = text;

  const newTodo = {
    title,
    details,
    due_date: newDate,
    priority: newPriority,
    status: newStatus,
  };

  const response = await fetch(
    `https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/todolist.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "applicaton/json",
      },
      body: JSON.stringify(newTodo),
    }
  );

  const data = await response.json();

  return new NextResponse(JSON.stringify(data.name), { status: 200 });
}
