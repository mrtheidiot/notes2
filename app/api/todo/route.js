import { query } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const items = await query("SELECT * FROM ToDoList;", []);
  return NextResponse.json(items[0], { status: 200 });
}

export async function POST(req) {
  let text = JSON.parse(await new Response(req.body).text()); //temp

  const newDate = text.due_date ? text.due_date : new Date ()
  const newPriority = text.priority ? text.priority : 'Low'
  const newStatus = text.status ? text.status : "Pending"

  const { title, details } = text;



  const values = [title, details, newDate, newPriority, newStatus];
  const query1 =
    "INSERT INTO ToDoList (title, details, due_date, priority, status) VALUES (?, ?, ?, ?, ?)";

  await query(query1, values);

  return new Response("The note was added to to the DB!");
}
