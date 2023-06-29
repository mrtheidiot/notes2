import mysql from "mysql2/promise";

export const query = async (query, values) => {
  const dbConnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const results = await dbConnection.execute(query, values);
    dbConnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
  }
};

export const addNoteToDb = async (values) => {
  const { title, tags, long_text, date_time_field } = values;

  const queryText =
    "INSERT INTO notes (title, tags, long_text, active, created_by, date_time_field) VALUES (?, ?, ?, ?, ?, ?)";
  const values2 = [title, tags, long_text, "1", "Piotr", date_time_field];

  await query(queryText, values2);
};

export const pullOneNote = async (id) => {
  const queryText = `SELECT * FROM notes WHERE id = ${id}`;
  const values2 = [];
  const note = await query(queryText, values2);
  return note[0][0];
};

export const getNotes_IdTitleCreatedUpdated =
  "SELECT id, title, created_at, updated_at FROM notes;";


